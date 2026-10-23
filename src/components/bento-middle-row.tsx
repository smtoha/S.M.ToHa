import React, { useState } from 'react';
import {
  Monitor,
  Settings,
  Cpu,
  BarChart3,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import {
  experienceItems,
  serviceItems,
  skillItems,
  siteMetadata,
  principles,
} from '../lib/site-data';
import { SectionHeading } from './section-heading';

const TechIcon: React.FC<{ iconKey: string }> = ({ iconKey }) => {
  switch (iconKey) {
    case 'ts':
      return (
        <span className="w-6 h-6 rounded-[5px] bg-[#3178C6] text-white font-extrabold text-[10px] flex items-center justify-center tracking-tighter">
          TS
        </span>
      );
    case 'js':
      return (
        <span className="w-6 h-6 rounded-[5px] bg-[#F7DF1E] text-[#171512] font-extrabold text-[10px] flex items-center justify-center tracking-tighter">
          JS
        </span>
      );
    case 'python':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M11.9 2C7.8 2 8.2 3.8 8.2 3.8V5.8H12.1V6.5H6.5C6.5 6.5 3.8 6.2 3.8 10.3C3.8 14.4 6.1 14.2 6.1 14.2H7.6V12.1C7.6 12.1 7.5 9.8 9.9 9.8H14.1C14.1 9.8 16.2 9.8 16.2 7.7V4.2C16.2 4.2 16.5 2 11.9 2Z"
            fill="#3776AB"
          />
          <path
            d="M12.1 22C16.2 22 15.8 20.2 15.8 20.2V18.2H11.9V17.5H17.5C17.5 17.5 20.2 17.8 20.2 13.7C20.2 9.6 17.9 9.8 17.9 9.8H16.4V11.9C16.4 11.9 16.5 14.2 14.1 14.2H9.9C9.9 14.2 7.8 14.2 7.8 16.3V19.8C7.8 19.8 7.5 22 12.1 22Z"
            fill="#FFD343"
          />
        </svg>
      );
    case 'react':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="2.1" fill="#00D8FF" />
          <ellipse
            cx="12"
            cy="12"
            rx="9"
            ry="3.6"
            stroke="#00D8FF"
            strokeWidth="1.5"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="9"
            ry="3.6"
            transform="rotate(60 12 12)"
            stroke="#00D8FF"
            strokeWidth="1.5"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="9"
            ry="3.6"
            transform="rotate(120 12 12)"
            stroke="#00D8FF"
            strokeWidth="1.5"
          />
        </svg>
      );
    case 'nextjs':
      return (
        <span className="w-6 h-6 rounded-full bg-[#171512] text-white font-black text-[11px] flex items-center justify-center">
          N
        </span>
      );
    case 'nodejs':
      return (
        <span className="w-6 h-6 rounded-md bg-[#339933]/15 text-[#339933] font-black text-[10px] border border-[#339933]/40 flex items-center justify-center">
          JS
        </span>
      );
    case 'laravel':
      return (
        <span className="w-6 h-6 rounded-md bg-[#FF2D20]/10 text-[#FF2D20] font-extrabold text-[11px] border border-[#FF2D20]/30 flex items-center justify-center">
          L
        </span>
      );
    case 'php':
      return (
        <span className="px-1.5 h-5 rounded-full bg-[#777BB4] text-white font-bold italic text-[9px] flex items-center justify-center">
          php
        </span>
      );
    case 'mongodb':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 2C12 2 7 7.2 7 13.2C7 17.5 10.2 20.4 12 22C13.8 20.4 17 17.5 17 13.2C17 7.2 12 2 12 2Z"
            fill="#47A248"
          />
          <path d="M12 5V21" stroke="#E8F5E9" strokeWidth="1.2" />
        </svg>
      );
    case 'mysql':
      return (
        <span className="w-6 h-6 rounded-md bg-[#00758F]/12 text-[#00758F] font-extrabold text-[9px] border border-[#00758F]/30 flex items-center justify-center">
          SQL
        </span>
      );
    case 'esp32':
      return (
        <span className="w-6 h-6 rounded-[5px] bg-[#E7352C] text-white font-bold text-[8.5px] flex items-center justify-center">
          ESP
        </span>
      );
    case 'git':
      return (
        <span className="w-6 h-6 rounded-[5px] bg-[#F05032] text-white font-extrabold text-[10px] flex items-center justify-center">
          Git
        </span>
      );
    default:
      return (
        <span className="w-6 h-6 rounded-[5px] bg-[#6E452F]/15 text-[#6E452F] font-bold text-[10px] flex items-center justify-center">
          {iconKey.slice(0, 2).toUpperCase()}
        </span>
      );
  }
};

export const BentoMiddleRow: React.FC = () => {
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [showAboutDrawer, setShowAboutDrawer] = useState(false);

  const displayedSkills = showAllSkills
    ? skillItems
    : skillItems.filter((s) => s.featured);

  return (
    <div id="about" className="max-w-[1440px] mx-auto px-4 sm:px-8 py-3">
      {/* 3-Column Bento Grid: 02 Experience & Education | 03 What I Build | 04 Technical Toolkit */}
      <div
        id="experience"
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
      >
        {/* Column 1 (02 | Experience & Education) */}
        <section className="lg:col-span-4">
          <SectionHeading
            number="02"
            title="Experience & Education"
            actionLabel={showAboutDrawer ? 'Hide About' : 'About & Principles'}
            onActionClick={() => setShowAboutDrawer((prev) => !prev)}
          />

          <div className="relative pt-1 space-y-4">
            {/* Continuous vertical timeline lines passing through the two dot columns */}
            <div
              className="pointer-events-none absolute top-2 bottom-2 left-[3px] w-[1px] bg-[#C8BCA9]"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute top-2 bottom-2 left-[103px] w-[1px] bg-[#C8BCA9]"
              aria-hidden="true"
            />

            {experienceItems.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-[110px_1fr] gap-3.5 items-start relative"
              >
                {/* Left Date Column with dual vertical timeline dots matching reference */}
                <div className="relative flex items-center justify-between pt-1">
                  <span className="w-[7px] h-[7px] rounded-full bg-[#171512] ring-2 ring-[#F5EFE6] z-10 shrink-0" />
                  <span className="text-[11px] font-semibold text-[#5C554E] tabular-nums whitespace-nowrap px-1">
                    {item.period}
                  </span>
                  <span className="w-[7px] h-[7px] rounded-full bg-[#171512] ring-2 ring-[#F5EFE6] z-10 shrink-0" />
                </div>

                {/* Right Role & Description */}
                <div className="pb-0.5">
                  <h3 className="text-[13px] font-extrabold text-[#171512] leading-tight">
                    {item.role}
                  </h3>
                  {item.organization && (
                    <p className="text-[11.5px] font-semibold text-[#5C554E] mt-0.5">
                      {item.organization}
                    </p>
                  )}
                  <p className="text-[11px] text-[#6B635B] leading-[1.45] mt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Column 2 (03 | What I Build) */}
        <section className="lg:col-span-4">
          <SectionHeading number="03" title="What I Build" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
            {serviceItems.map((service) => (
              <div
                key={service.id}
                className="flex items-start gap-3 p-2.5 rounded-xl bg-[#FBF7F0]/75 border border-[#EAE1D3] hover:bg-[#FBF7F0] transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-[#EFE6D8] text-[#6E452F] flex items-center justify-center shrink-0 mt-0.5">
                  {service.icon === 'web' && <Monitor className="w-4 h-4" />}
                  {service.icon === 'automation' && <Settings className="w-4 h-4" />}
                  {service.icon === 'iot' && <Cpu className="w-4 h-4" />}
                  {service.icon === 'ai' && <BarChart3 className="w-4 h-4" />}
                </div>
                <div>
                  <h3 className="text-[12.5px] font-extrabold text-[#171512] leading-snug mb-1">
                    {service.title}
                  </h3>
                  <p className="text-[11px] text-[#665E57] leading-[1.4]">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Column 3 (04 | Technical Toolkit) */}
        <section className="lg:col-span-4">
          <SectionHeading
            number="04"
            title="Technical Toolkit"
            actionLabel={showAllSkills ? 'Show core (12)' : 'View all'}
            onActionClick={() => setShowAllSkills((prev) => !prev)}
          />

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-1">
            {displayedSkills.map((skill) => (
              <div
                key={skill.name}
                className="paper-card rounded-xl py-2.5 px-1.5 flex flex-col items-center justify-center gap-1.5 hover:border-[#BD875D]/50 transition-colors"
              >
                <TechIcon iconKey={skill.iconKey} />
                <span className="text-[10.5px] font-semibold text-[#2B2620] whitespace-nowrap truncate max-w-full">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Expandable About & Principles Panel */}
      {showAboutDrawer && (
        <div className="mt-4 paper-card rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-extrabold text-[#171512]">
              About S.M. Toha &amp; Engineering Principles
            </h3>
            <button
              type="button"
              onClick={() => setShowAboutDrawer(false)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#6E452F] cursor-pointer"
            >
              <span>Close</span>
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-xs text-[#4A443D] leading-relaxed">
            {siteMetadata.aboutCopy}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
            {principles.map((p) => (
              <div
                key={p.title}
                className="rounded-xl bg-[#F4EEE5] p-3 border border-[#E5DDD0]"
              >
                <div className="text-xs font-extrabold text-[#171512]">{p.title}</div>
                <div className="text-[11px] font-semibold text-[#B86B35] mb-1">
                  {p.subtitle}
                </div>
                <p className="text-[11px] text-[#5C554E] leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
