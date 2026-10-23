import React, { useState, useEffect } from 'react';
import { BrainCircuit, Sprout, Eye, Radio, Star, ExternalLink, RefreshCw } from 'lucide-react';
import { researchItems, siteMetadata } from '../lib/site-data';
import { fetchGitHubActivity, buildFallbackGitHubPayload } from '../lib/github';
import { GitHubActivityPayload } from '../types/github';
import { SectionHeading } from './section-heading';

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const LEVEL_COLORS: Record<number, string> = {
  0: 'bg-[#262B31]',
  1: 'bg-[#195332]',
  2: 'bg-[#217C46]',
  3: 'bg-[#2EA043]',
  4: 'bg-[#39D353]',
};

export const LowerSplitRow: React.FC = () => {
  const [showAllResearch, setShowAllResearch] = useState(false);
  const [selectedResearchId, setSelectedResearchId] = useState<string | null>(null);
  const [githubData, setGithubData] = useState<GitHubActivityPayload>(() =>
    buildFallbackGitHubPayload()
  );
  const [loadingGithub, setLoadingGithub] = useState(false);

  useEffect(() => {
    let active = true;
    setLoadingGithub(true);
    fetchGitHubActivity(siteMetadata.githubUsername)
      .then((data) => {
        if (active) setGithubData(data);
      })
      .finally(() => {
        if (active) setLoadingGithub(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const visibleResearch = showAllResearch
    ? researchItems
    : researchItems.filter((r) => r.featured);

  const selectedResearch = researchItems.find((r) => r.id === selectedResearchId);

  return (
    <div id="research" className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-2 pb-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (05 | Research Interests) */}
        <section className="lg:col-span-6">
          <SectionHeading
            number="05"
            title="Research Interests"
            actionLabel={showAllResearch ? 'Show featured (3)' : 'View all'}
            onActionClick={() => setShowAllResearch((prev) => !prev)}
          />

          <div
            className={`grid grid-cols-1 ${
              showAllResearch ? 'sm:grid-cols-2' : 'sm:grid-cols-3'
            } gap-3 pt-0.5`}
          >
            {visibleResearch.map((item) => {
              const isSelected = selectedResearchId === item.id;
              return (
                <article
                  key={item.id}
                  onClick={() =>
                    setSelectedResearchId((prev) => (prev === item.id ? null : item.id))
                  }
                  className={`paper-card paper-card-hover rounded-2xl p-3.5 cursor-pointer flex items-start gap-3 ${
                    isSelected ? 'ring-1 ring-[#B86B35]' : ''
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-[#EFE6D8] text-[#6E452F] flex items-center justify-center shrink-0 mt-0.5">
                    {item.icon === 'nilm' && <BrainCircuit className="w-5 h-5" />}
                    {item.icon === 'agri' && <Sprout className="w-5 h-5" />}
                    {item.icon === 'vision' && <Eye className="w-5 h-5" />}
                    {item.icon === 'wireless' && <Radio className="w-5 h-5" />}
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-[12px] font-extrabold text-[#171512] leading-snug mb-1">
                      {item.title}
                    </h3>
                    <p className="text-[10.5px] text-[#665E57] leading-[1.4]">
                      {item.description}
                    </p>
                    <p className="text-[10px] font-semibold text-[#B86B35] mt-1.5">
                      {item.status}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          {selectedResearch && (
            <div className="mt-3 paper-card rounded-xl p-3.5 border-l-2 border-[#B86B35]">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-extrabold text-[#171512]">
                  {selectedResearch.title} — Research Note
                </span>
                <span className="text-[10.5px] font-semibold text-[#6E452F]">
                  {selectedResearch.status}
                </span>
              </div>
              <p className="text-xs text-[#4E4841] leading-relaxed">
                {selectedResearch.details}
              </p>
            </div>
          )}
        </section>

        {/* Right Column (06 | GitHub Activity) */}
        <section className="lg:col-span-6">
          <SectionHeading
            number="06"
            title="GitHub Activity"
            actionLabel="View on GitHub"
            actionHref={siteMetadata.githubUrl}
          />

          {/* Dark Charcoal GitHub Activity Panel matching reference */}
          <div className="bg-[#18191C] text-[#F4EEE5] rounded-2xl p-4 shadow-xl border border-[#2C2D31]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Left 7 columns: Profile metrics + Contribution heatmap */}
              <div className="md:col-span-7 md:border-r md:border-[#2C2E33] md:pr-4">
                {/* Top Profile & Stats Strip */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <a
                    href={githubData.profile.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 group min-w-0"
                  >
                    <div className="w-9 h-9 rounded-full overflow-hidden bg-[#1D4ED8] ring-2 ring-[#3B82F6]/40 shrink-0">
                      <img
                        src={githubData.profile.avatar_url}
                        alt={githubData.profile.login}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[13px] font-extrabold text-white group-hover:text-[#BD875D] transition-colors truncate">
                        {githubData.profile.login}
                      </div>
                      <div className="text-[10.5px] text-[#9CA3AF] truncate">
                        {githubData.profile.name}
                      </div>
                    </div>
                  </a>

                  <div className="flex items-center gap-3 sm:gap-4 text-center shrink-0">
                    <div className="border-l border-[#2E3036] pl-3">
                      <div className="text-[13px] font-extrabold text-white tabular-nums">
                        {githubData.displayStats.repositoriesLabel}
                      </div>
                      <div className="text-[9.5px] text-[#9CA3AF]">Repositories</div>
                    </div>
                    <div className="border-l border-[#2E3036] pl-3">
                      <div className="text-[13px] font-extrabold text-white tabular-nums">
                        {githubData.displayStats.starsLabel}
                      </div>
                      <div className="text-[9.5px] text-[#9CA3AF]">Total Stars</div>
                    </div>
                    <div className="border-l border-[#2E3036] pl-3">
                      <div className="text-[13px] font-extrabold text-white tabular-nums">
                        {githubData.displayStats.contributionsLabel}
                      </div>
                      <div className="text-[9.5px] text-[#9CA3AF]">Contributions</div>
                    </div>
                  </div>
                </div>

                {/* Contribution Grid (4 rows x 36 columns) */}
                <div className="bg-[#131417] rounded-xl p-2.5 border border-[#25272C]">
                  <div
                    className="grid gap-[3px]"
                    style={{ gridTemplateColumns: 'repeat(36, minmax(0, 1fr))' }}
                    aria-label="GitHub contribution activity matrix"
                  >
                    {githubData.contributionMatrix.map((row, rIdx) =>
                      row.map((level, cIdx) => (
                        <span
                          key={`${rIdx}-${cIdx}`}
                          className={`aspect-square rounded-[2px] ${
                            LEVEL_COLORS[level] || LEVEL_COLORS[1]
                          }`}
                        />
                      ))
                    )}
                  </div>

                  {/* Month Labels */}
                  <div className="grid grid-cols-12 mt-1.5 text-[9px] text-[#8B949E] font-medium">
                    {MONTHS.map((m) => (
                      <span key={m} className="text-center">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right 5 columns: Top Repositories list */}
              <div className="md:col-span-5">
                <div className="flex items-center justify-between text-[10.5px] font-bold text-[#9CA3AF] pb-1.5 mb-1.5 border-b border-[#2A2C32]">
                  <span>Top Repositories</span>
                  <span>Stars</span>
                </div>

                <ul className="space-y-1.5">
                  {githubData.topRepositories.slice(0, 5).map((repo, idx) => {
                    const badgeColors = [
                      'bg-[#4F46E5] text-white',
                      'bg-[#2563EB] text-white',
                      'bg-[#0284C7] text-white',
                      'bg-[#D97706] text-white',
                      'bg-[#DC2626] text-white',
                    ];
                    return (
                      <li key={repo.name}>
                        <a
                          href={repo.html_url || siteMetadata.githubReposUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between gap-2 py-1 px-1.5 rounded-lg hover:bg-[#23252A] transition-colors group"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span
                              className={`w-4 h-4 rounded-[4px] text-[8.5px] font-extrabold flex items-center justify-center shrink-0 ${
                                badgeColors[idx % badgeColors.length]
                              }`}
                            >
                              {repo.badgeText || repo.name.slice(0, 2).toUpperCase()}
                            </span>
                            <span className="text-[11.5px] font-medium text-[#E5E7EB] group-hover:text-white truncate">
                              {repo.name}
                            </span>
                          </div>

                          <div className="flex items-center gap-1 text-[11.5px] font-bold text-white tabular-nums shrink-0">
                            <span>{repo.stargazers_count}</span>
                            <Star className="w-3 h-3 text-[#FBBF24] fill-[#FBBF24]" />
                          </div>
                        </a>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-2 pt-1.5 border-t border-[#26282E] flex items-center justify-between text-[10px] text-[#8B949E]">
                  <a
                    href={siteMetadata.githubReposUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-white transition-colors"
                  >
                    <span>All public repositories</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                  {loadingGithub && (
                    <span className="inline-flex items-center gap-1">
                      <RefreshCw className="w-2.5 h-2.5 animate-spin" />
                      Syncing
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
