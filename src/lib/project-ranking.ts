import { GitHubRepo } from '../types/github';
import { Project } from '../types/project';

/**
 * Computes a transparent quality/relevance score for sorting public GitHub repositories.
 * Prefers non-fork, non-archived repositories with descriptions, stars, and forks.
 */
export function scoreRepository(repo: GitHubRepo): number {
  if (repo.archived) return -1000;
  let score = 0;
  if (!repo.fork) score += 100;
  if (repo.description && repo.description.trim().length > 10) score += 25;
  if (repo.language) score += 10;
  score += (repo.stargazers_count || 0) * 5;
  score += (repo.forks_count || 0) * 2;
  return score;
}

/**
 * Ranks and returns the top N repositories using transparent criteria:
 * non-fork, non-archived, stars, forks, and description completeness.
 */
export function rankRepositories(repos: GitHubRepo[], limit = 5): GitHubRepo[] {
  if (!Array.isArray(repos)) return [];
  return [...repos]
    .filter((r) => !r.archived)
    .sort((a, b) => {
      const diff = scoreRepository(b) - scoreRepository(a);
      if (diff !== 0) return diff;
      return (b.stargazers_count || 0) - (a.stargazers_count || 0);
    })
    .slice(0, Math.max(1, limit));
}

/**
 * Sums total stargazers across all fetched repositories.
 */
export function calculateTotalStars(repos: GitHubRepo[]): number {
  if (!Array.isArray(repos)) return 0;
  return repos.reduce((sum, repo) => sum + Math.max(0, repo.stargazers_count || 0), 0);
}

/**
 * Filters portfolio projects by category ('All' | 'Web' | 'AI' | 'IoT' | 'Systems'),
 * featured flag, and optional search query.
 */
export function filterProjects(
  allProjects: Project[],
  options: {
    showAll?: boolean;
    category?: string;
    query?: string;
  } = {}
): Project[] {
  const { showAll = false, category = 'All', query = '' } = options;
  const normalizedQuery = query.trim().toLowerCase();

  return allProjects.filter((project) => {
    if (!showAll && !project.featured && category === 'All' && !normalizedQuery) {
      return false;
    }
    if (category && category !== 'All' && project.category !== category) {
      return false;
    }
    if (normalizedQuery) {
      const haystack = [
        project.name,
        project.description,
        project.longDescription,
        ...project.tags,
      ]
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(normalizedQuery)) {
        return false;
      }
    }
    return true;
  });
}

/**
 * Generates a deterministic 4-row x 36-column contribution matrix for the
 * GitHub Activity card matching the visual rhythm of the reference layout.
 * Values are intensity levels 0..4.
 */
export function generateContributionMatrix(seed = 129): number[][] {
  const rows = 4;
  const cols = 36;
  const matrix: number[][] = [];
  let s = seed;
  const nextRand = () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };

  for (let r = 0; r < rows; r++) {
    const row: number[] = [];
    for (let c = 0; c < cols; c++) {
      const v = nextRand();
      if (v < 0.12) row.push(0);
      else if (v < 0.35) row.push(1);
      else if (v < 0.68) row.push(2);
      else if (v < 0.88) row.push(3);
      else row.push(4);
    }
    matrix.push(row);
  }
  return matrix;
}
