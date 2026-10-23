import React, { useState } from 'react';
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import { siteMetadata } from '../lib/site-data';

interface HeroSectionProps {
  onViewWork: () => void;
  onOpenContact: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onViewWork,
  onOpenContact,
}) => {
  const [imgFallback, setImgFallback] = useState(false);

  return (
    <section
      id="home"
      className="relative overflow-hidden hero-surface border-b border-[#E5DDD0]/80"
    >
      {/* Subtle decorative corner orbit lines matching the reference hero */}
      <svg
        className="pointer-events-none absolute -bottom-16 -left-16 w-72 h-72 text-[#D8CBB8] opacity-60"
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="40" cy="160" r="120" stroke="currentColor" strokeWidth="1" />
      </svg>
      <svg
        className="pointer-events-none absolute -top-10 -right-10 w-64 h-64 text-[#C99E7A] opacity-50"
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="170" cy="30" r="110" stroke="currentColor" strokeWidth="1" />
        <circle cx="105" cy="118" r="3.5" fill="#6E452F" />
      </svg>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-4 pb-0 lg:pt-3 lg:pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-2">
          {/* Zone 1: Left Identity Column */}
          <div className="lg:col-span-5 z-10 py-4 lg:py-6">
            <p className="text-[10.5px] sm:text-[11px] font-semibold tracking-[0.26em] text-[#4E4841] uppercase mb-2">
              {siteMetadata.eyebrow}
            </p>

            <h1 className="font-hero-wide uppercase select-none leading-[0.86] mb-3">
              <span className="block text-[54px] sm:text-[68px] xl:text-[78px] font-black text-[#171512] tracking-[-0.04em]">
                S.M.
              </span>
              <span className="block text-[54px] sm:text-[68px] xl:text-[78px] font-black text-[#6E452F] tracking-[-0.03em]">
                TOHA
              </span>
            </h1>

            <p className="text-[14px] sm:text-[15px] text-[#3E3933] leading-[1.45] max-w-[390px] mb-5 font-medium">
              {siteMetadata.heroIntro}
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <button
                type="button"
                onClick={onViewWork}
                className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#191614] text-[#FBF7F0] text-[13px] font-semibold shadow-sm hover:bg-[#2E2620] transition-all cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={siteMetadata.cvUrl}
                download="SM-Toha-CV.pdf"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FBF7F0] text-[#171512] border border-[#E0D6C7] text-[13px] font-semibold hover:bg-[#EFE7DA] transition-all whitespace-nowrap shrink-0 shadow-2xs"
              >
                <Download className="w-3.5 h-3.5 text-[#5A524A]" />
                <span>Download CV</span>
              </a>
            </div>

            {/* Social Links Strip */}
            <div className="flex flex-wrap items-center gap-5 text-[12px] font-semibold text-[#3B352F]">
              <a
                href={siteMetadata.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-[#6E452F] transition-colors whitespace-nowrap"
              >
                <Github className="w-3.5 h-3.5 text-[#171512]" />
                <span>GitHub</span>
              </a>
              <a
                href={siteMetadata.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-[#6E452F] transition-colors whitespace-nowrap"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#171512]" />
                <span>LinkedIn</span>
              </a>
              <a
                href={siteMetadata.twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-[#6E452F] transition-colors whitespace-nowrap"
              >
                <svg
                  className="w-3.5 h-3.5 text-[#171512]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span>Twitter (X)</span>
              </a>
              <button
                type="button"
                onClick={onOpenContact}
                className="inline-flex items-center gap-1.5 hover:text-[#6E452F] transition-colors whitespace-nowrap cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-[#171512]" />
                <span>Email</span>
              </button>
            </div>
          </div>

          {/* Zone 2: Center Portrait Column */}
          <div className="lg:col-span-4 relative flex items-end justify-center self-end min-h-[280px] sm:min-h-[330px]">
            {!imgFallback ? (
              <img
                src={siteMetadata.heroCompositeUrl}
                alt="Portrait of S.M. Toha in black suit and tie against a warm circular backdrop"
                width={540}
                height={360}
                referrerPolicy="no-referrer"
                onError={() => setImgFallback(true)}
                className="w-full max-w-[490px] h-auto object-contain object-bottom select-none hero-portrait-mask"
              />
            ) : (
              <div className="relative flex items-end justify-center pt-4">
                <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-gradient-to-tr from-[#A98260] via-[#C9A685] to-[#DFC5AA] absolute bottom-2" />
                <img
                  src={siteMetadata.portraitUrl}
                  alt="Portrait of S.M. Toha"
                  width={320}
                  height={360}
                  referrerPolicy="no-referrer"
                  className="relative z-10 w-64 sm:w-72 h-80 object-cover object-top rounded-t-3xl"
                />
              </div>
            )}
          </div>

          {/* Zone 3: Right Engineering Value Column */}
          <div className="lg:col-span-3 z-10 py-4 lg:py-6 lg:pl-2">
            <p className="text-[10.5px] font-semibold tracking-[0.26em] text-[#5A534A] uppercase mb-2">
              {siteMetadata.valueEyebrow}
            </p>

            <h2 className="text-[28px] sm:text-[32px] xl:text-[35px] font-extrabold tracking-tight text-[#171512] leading-[1.08] mb-3 text-balance">
              Turning ideas into impactful{' '}
              <span className="text-[#6E452F] block sm:inline">
                {siteMetadata.valueHeadlineAccent}
              </span>
            </h2>

            <p className="text-[12.5px] sm:text-[13px] text-[#5C554E] leading-[1.55] mb-5">
              {siteMetadata.valueSupporting}
            </p>

            {/* 3-Column Truthful Stats Bar */}
            <div className="grid grid-cols-3 border-t border-[#E5DDD0] pt-3.5">
              {siteMetadata.heroStats.map((stat, idx) => (
                <div
                  key={stat.label}
                  className={`${
                    idx > 0 ? 'pl-4 border-l border-[#DFD6C7]' : 'pr-3'
                  }`}
                >
                  <div
                    className={`text-[21px] sm:text-[23px] font-extrabold leading-none tabular-nums mb-1 ${
                      stat.accent ? 'text-[#6E452F]' : 'text-[#171512]'
                    }`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-[11px] font-medium text-[#6B635B] whitespace-nowrap">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
