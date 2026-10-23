import React from 'react';
import { ArrowRight } from 'lucide-react';

interface SectionHeadingProps {
  number: string;
  title: string;
  actionLabel?: string;
  actionHref?: string;
  onActionClick?: () => void;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  number,
  title,
  actionLabel,
  actionHref,
  onActionClick,
}) => {
  return (
    <div className="flex items-center justify-between gap-4 mb-3.5">
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-bold tracking-wider text-[#B86B35] tabular-nums">
          {number}
        </span>
        <span className="text-[#D5C7B4] text-xs select-none" aria-hidden="true">
          |
        </span>
        <h2 className="text-[18px] sm:text-[20px] font-extrabold tracking-tight text-[#171512]">
          {title}
        </h2>
      </div>

      {actionLabel &&
        (actionHref ? (
          <a
            href={actionHref}
            target={actionHref.startsWith('http') ? '_blank' : undefined}
            rel={actionHref.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3B352E] hover:text-[#6E452F] transition-colors whitespace-nowrap shrink-0"
          >
            <span>{actionLabel}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        ) : (
          <button
            type="button"
            onClick={onActionClick}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3B352E] hover:text-[#6E452F] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>{actionLabel}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ))}
    </div>
  );
};
