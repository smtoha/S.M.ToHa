import React, { useState } from 'react';
import {
  ArrowUpRight,
  ExternalLink,
  Github,
  Star,
  X,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import { Project } from '../types/project';
import { projects } from '../lib/site-data';
import { filterProjects } from '../lib/project-ranking';
import { SectionHeading } from './section-heading';

export const ProjectGrid: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const visibleProjects = filterProjects(projects, {
    showAll,
    category: selectedCategory,
  });

  const categories = ['All', 'Web', 'AI', 'IoT', 'Systems'];

  const handleToggleAll = () => {
    setShowAll((prev) => {
      const next = !prev;
      if (!next) setSelectedCategory('All');
      return next;
    });
  };

  return (
    <section id="projects" className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-5 pb-4">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold tracking-wider text-[#B86B35] tabular-nums">
            01
          </span>
          <span className="text-[#D5C7B4] text-xs select-none" aria-hidden="true">
            |
          </span>
          <h2 className="text-[18px] sm:text-[20px] font-extrabold tracking-tight text-[#171512]">
            Selected Projects
          </h2>
        </div>

        <div className="flex items-center gap-3">
          {showAll && (
            <div
              role="group"
              aria-label="Filter projects by category"
              className="hidden sm:flex items-center gap-1 p-1 rounded-lg bg-[#EAE2D6]/70"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    selectedCategory === cat
                      ? 'bg-[#FBF7F0] text-[#171512] shadow-2xs'
                      : 'text-[#5A534A] hover:text-[#171512]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={handleToggleAll}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2B2620] hover:text-[#6E452F] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>{showAll ? 'Show featured (4)' : 'View all projects'}</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      {/* 4-column desktop project card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {visibleProjects.map((project) => (
          <article
            key={project.id}
            className="paper-card paper-card-hover rounded-2xl overflow-hidden flex flex-col justify-between group"
          >
            <div>
              {/* Screenshot Thumbnail Container */}
              <div
                onClick={() => setSelectedProject(project)}
                className="relative h-[116px] sm:h-[120px] w-full bg-[#191617] overflow-hidden cursor-pointer"
              >
                {!failedImages[project.id] ? (
                  <img
                    src={project.image}
                    alt={`${project.name} screenshot preview`}
                    width={680}
                    height={218}
                    referrerPolicy="no-referrer"
                    onError={() =>
                      setFailedImages((prev) => ({ ...prev, [project.id]: true }))
                    }
                    className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-200"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#211B17] via-[#3A281E] to-[#171512] text-[#FBF7F0] p-4">
                    <div className="flex items-center gap-2 text-sm font-bold">
                      <Layers className="w-4 h-4 text-[#BD875D]" />
                      <span>{project.name}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Card Content */}
              <div className="p-3.5 pb-2">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-[14.5px] font-extrabold text-[#171512] leading-snug">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="text-left hover:text-[#6E452F] transition-colors cursor-pointer"
                    >
                      {project.name}
                    </button>
                  </h3>
                </div>

                <p className="text-[11.5px] text-[#5C554E] leading-[1.45] line-clamp-2 min-h-[33px]">
                  {project.description}
                </p>
              </div>
            </div>

            {/* Footer Row: Tech Tags + External / Case Study Button */}
            <div className="px-3.5 pb-3 pt-1 flex items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md bg-[#F2ECE1] text-[#3F3933] text-[10px] font-semibold whitespace-nowrap shrink-0"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setSelectedProject(project)}
                aria-label={`Inspect ${project.name} project details`}
                className="w-6 h-6 rounded-full bg-[#F2ECE1] hover:bg-[#171512] text-[#171512] hover:text-[#FBF7F0] flex items-center justify-center transition-colors shrink-0 cursor-pointer"
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Project Case Study Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171512]/70 backdrop-blur-xs"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-[#FBF7F0] border border-[#DFD5C7] rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-48 bg-[#171512]">
              <img
                src={selectedProject.image}
                alt={selectedProject.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project details modal"
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#171512]/80 text-[#FBF7F0] hover:bg-[#171512] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between gap-3 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#B86B35]">
                  {selectedProject.category} · {selectedProject.status}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#5C554E] tabular-nums">
                  <Star className="w-3.5 h-3.5 text-[#D97706] fill-[#D97706]" />
                  {selectedProject.stars} stars
                </span>
              </div>

              <h3
                id="project-modal-title"
                className="text-xl font-extrabold text-[#171512] mb-2"
              >
                {selectedProject.name}
              </h3>

              <p className="text-sm text-[#4A443D] leading-relaxed mb-4">
                {selectedProject.longDescription}
              </p>

              <div className="mb-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#6E452F] mb-2">
                  Engineering Highlights
                </h4>
                <ul className="space-y-1.5">
                  {selectedProject.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-xs text-[#3E3933]"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#438A60] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 mb-5">
                {selectedProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md bg-[#EFE7DA] text-[#2B2620] text-xs font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-[#E6DDD0]">
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 rounded-full text-xs font-semibold text-[#5C554E] hover:bg-[#EFE7DA] transition-colors cursor-pointer"
                >
                  Close
                </button>
                <a
                  href={selectedProject.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#191614] text-[#FBF7F0] text-xs font-semibold hover:bg-[#2F2620] transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>View Source on GitHub</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
