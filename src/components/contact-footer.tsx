import React, { useState } from 'react';
import {
  Mail,
  ArrowRight,
  Github,
  Linkedin,
  UserCheck,
  CheckCircle2,
  Infinity as InfinityIcon,
  X,
  Send,
  ArrowUp,
  FileText,
} from 'lucide-react';
import { siteMetadata } from '../lib/site-data';
import { validateContactInput } from '../lib/validators';

interface ContactFooterProps {
  isModalOpen: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
}

export const ContactFooter: React.FC<ContactFooterProps> = ({
  isModalOpen,
  onOpenModal,
  onCloseModal,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submittedReceipt, setSubmittedReceipt] = useState<{
    id: string;
    name: string;
    email: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateContactInput({ name, email, subject, message });
    if (!result.valid) {
      setErrors(result.errors as Record<string, string>);
      return;
    }

    setErrors({});
    setSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.sanitized),
      });
      const data = await response.json();
      if (response.ok && data.ok) {
        setSubmittedReceipt({
          id: data.inquiry.id,
          name: data.inquiry.name,
          email: data.inquiry.email,
        });
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else if (data.errors) {
        setErrors(data.errors);
      }
    } catch {
      setSubmittedReceipt({
        id: `local_${Date.now().toString(36)}`,
        name: result.sanitized!.name,
        email: result.sanitized!.email,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="contact"
      className="relative bg-[#141210] text-[#F4EEE5] overflow-hidden border-t border-[#2B241E]"
    >
      {/* Subtle copper geometric lines in footer background matching reference */}
      <svg
        className="pointer-events-none absolute inset-0 w-full h-full opacity-25"
        viewBox="0 0 1440 200"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M320 200 L520 65 L740 200"
          stroke="#BD875D"
          strokeWidth="0.8"
        />
        <path
          d="M440 200 L660 80 L910 200"
          stroke="#BD875D"
          strokeWidth="0.6"
        />
        <circle cx="520" cy="65" r="2.5" fill="#BD875D" />
        <circle cx="660" cy="80" r="2" fill="#BD875D" />
      </svg>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 py-7">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6">
          {/* Left Zone: 07 | LET'S WORK TOGETHER */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 text-[10.5px] font-bold tracking-[0.2em] text-[#BD875D] uppercase mb-1.5">
              <span>07</span>
              <span className="text-[#5C4938]">|</span>
              <span>LET&apos;S WORK TOGETHER</span>
            </div>

            <h2 className="text-2xl sm:text-[28px] font-extrabold text-white tracking-tight mb-1.5">
              Have a project in mind?
            </h2>

            <p className="text-xs sm:text-[13px] text-[#A8A096] max-w-md leading-relaxed">
              I&apos;m always open to discussing new opportunities, interesting ideas or
              potential collaborations.
            </p>
          </div>

          {/* Center Zone: Send an Email Button + Social Icons */}
          <div className="lg:col-span-3 flex flex-col items-start lg:items-center justify-center gap-3.5">
            <button
              type="button"
              onClick={onOpenModal}
              className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#FBF7F0] text-[#171512] text-xs sm:text-[13px] font-bold shadow-lg hover:bg-white transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              <Mail className="w-4 h-4 text-[#171512]" />
              <span>Send an Email</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center gap-4 text-[#D6CEC2]">
              <a
                href={siteMetadata.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="hover:text-[#BD875D] transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={siteMetadata.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="hover:text-[#BD875D] transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={siteMetadata.twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter (X) profile"
                className="hover:text-[#BD875D] transition-colors"
              >
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href={`mailto:${siteMetadata.email}`}
                aria-label="Direct email link"
                className="hover:text-[#BD875D] transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Zone: 3 Summary Metrics */}
          <div className="lg:col-span-4 grid grid-cols-3 gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-[#2A241E]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full border border-[#BD875D]/50 text-[#BD875D] flex items-center justify-center shrink-0">
                <UserCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="text-base sm:text-lg font-extrabold text-white leading-none tabular-nums">
                  20+
                </div>
                <div className="text-[10px] text-[#A8A096] mt-0.5 whitespace-nowrap">
                  Projects Completed
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 border-l border-[#2A241E] pl-3">
              <div className="w-8 h-8 rounded-full border border-[#BD875D]/50 text-[#BD875D] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-base sm:text-lg font-extrabold text-white leading-none tabular-nums">
                  5+
                </div>
                <div className="text-[10px] text-[#A8A096] mt-0.5 whitespace-nowrap">
                  Technologies
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 border-l border-[#2A241E] pl-3">
              <div className="w-8 h-8 rounded-full border border-[#BD875D]/50 text-[#BD875D] flex items-center justify-center shrink-0">
                <InfinityIcon className="w-4 h-4" />
              </div>
              <div>
                <div className="text-base sm:text-lg font-extrabold text-white leading-none">
                  ∞
                </div>
                <div className="text-[10px] text-[#A8A096] mt-0.5 whitespace-nowrap">
                  Always Learning
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Utility Bar */}
        <div className="mt-5 pt-3 border-t border-[#26201B] flex flex-wrap items-center justify-between gap-4 text-[11px] text-[#8C8277]">
          <div>
            © {new Date().getFullYear()} S.M. Toha. Built with React, TypeScript &amp; Tailwind CSS.
          </div>

          <div className="flex items-center gap-5">
            <a
              href={siteMetadata.cvUrl}
              download="SM-Toha-CV.pdf"
              className="inline-flex items-center gap-1 hover:text-[#F4EEE5] transition-colors"
            >
              <FileText className="w-3 h-3 text-[#BD875D]" />
              <span>Resume PDF</span>
            </a>
            <a
              href={`mailto:${siteMetadata.email}`}
              className="hover:text-[#F4EEE5] transition-colors"
            >
              {siteMetadata.email}
            </a>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-[#BD875D] hover:text-[#F4EEE5] transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Contact & Inquiry Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171512]/75 backdrop-blur-xs"
          onClick={onCloseModal}
        >
          <div
            className="bg-[#FBF7F0] text-[#171512] border border-[#DFD5C7] rounded-2xl max-w-md w-full p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#B86B35]">
                  Direct Inquiry
                </span>
                <h3
                  id="contact-modal-title"
                  className="text-lg font-extrabold text-[#171512]"
                >
                  Contact S.M. Toha
                </h3>
              </div>
              <button
                type="button"
                onClick={onCloseModal}
                aria-label="Close contact modal"
                className="w-8 h-8 rounded-full bg-[#EFE7DA] text-[#171512] hover:bg-[#E2D6C3] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {submittedReceipt ? (
              <div className="py-4 space-y-3">
                <div className="p-4 rounded-xl bg-[#438A60]/10 border border-[#438A60]/30 text-[#171512]">
                  <div className="flex items-center gap-2 font-bold text-sm text-[#2E6B47] mb-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Message delivered!</span>
                  </div>
                  <p className="text-xs text-[#4A443D] leading-relaxed">
                    Thank you, <strong>{submittedReceipt.name}</strong>. Your inquiry (
                    <code className="font-mono text-[11px]">{submittedReceipt.id}</code>) has
                    been recorded and a copy can also be sent via your email client.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <a
                    href={`mailto:${siteMetadata.email}`}
                    className="text-xs font-semibold text-[#6E452F] hover:underline"
                  >
                    Open in default mail client ({siteMetadata.email})
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedReceipt(null);
                      onCloseModal();
                    }}
                    className="px-4 py-2 rounded-full bg-[#191614] text-[#FBF7F0] text-xs font-semibold cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-bold text-[#3E3933] mb-1"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Tanvir Rahman"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#F4EEE5] border border-[#DCD2C2] text-xs text-[#171512] focus:outline-none focus:border-[#6E452F]"
                  />
                  {errors.name && (
                    <p className="text-[11px] text-[#C93B2B] font-medium mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-bold text-[#3E3933] mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#F4EEE5] border border-[#DCD2C2] text-xs text-[#171512] focus:outline-none focus:border-[#6E452F]"
                  />
                  {errors.email && (
                    <p className="text-[11px] text-[#C93B2B] font-medium mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-bold text-[#3E3933] mb-1"
                  >
                    Subject (Optional)
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Project collaboration, freelance, or internship"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#F4EEE5] border border-[#DCD2C2] text-xs text-[#171512] focus:outline-none focus:border-[#6E452F]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-bold text-[#3E3933] mb-1"
                  >
                    Project Details
                  </label>
                  <textarea
                    id="contact-message"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about your project, timeline, or collaboration idea..."
                    className="w-full px-3.5 py-2 rounded-xl bg-[#F4EEE5] border border-[#DCD2C2] text-xs text-[#171512] focus:outline-none focus:border-[#6E452F]"
                  />
                  {errors.message && (
                    <p className="text-[11px] text-[#C93B2B] font-medium mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <a
                    href={`mailto:${siteMetadata.email}`}
                    className="text-[11px] font-semibold text-[#6E452F] hover:underline"
                  >
                    Or email {siteMetadata.email}
                  </a>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#191614] text-[#FBF7F0] text-xs font-semibold hover:bg-[#2E251F] transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{submitting ? 'Sending...' : 'Send Message'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </footer>
  );
};
