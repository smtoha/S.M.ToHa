import { GitHubActivityPayload } from '../types/github';
import { fallbackGitHubProfile, fallbackGitHubRepos } from './site-data';
import {
  rankRepositories,
  calculateTotalStars,
  generateContributionMatrix,
} from './project-ranking';

export function buildFallbackGitHubPayload(): GitHubActivityPayload {
  const topRepositories = rankRepositories(fallbackGitHubRepos, 5);
  const totalStars = calculateTotalStars(fallbackGitHubRepos);
  return {
    profile: fallbackGitHubProfile,
    totalStars,
    totalContributions: 142,
    displayStats: {
      repositoriesLabel: '20+',
      starsLabel: '50+',
      contributionsLabel: '100+',
    },
    topRepositories,
    contributionMatrix: generateContributionMatrix(129),
    source: 'curated-fallback',
    fetchedAt: new Date().toISOString(),
  };
}

export async function fetchGitHubActivity(
  username = 'toha129'
): Promise<GitHubActivityPayload> {
  try {
    const response = await fetch(`/api/github?username=${encodeURIComponent(username)}`);
    if (!response.ok) {
      return buildFallbackGitHubPayload();
    }
    const data = (await response.json()) as GitHubActivityPayload;
    if (!data || !data.profile || !Array.isArray(data.topRepositories)) {
      return buildFallbackGitHubPayload();
    }
    return data;
  } catch {
    return buildFallbackGitHubPayload();
  }
}
