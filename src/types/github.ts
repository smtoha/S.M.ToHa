export interface GitHubRepo {
  id?: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  fork: boolean;
  archived: boolean;
  topics?: string[];
  iconColor?: string;
  badgeText?: string;
}

export interface GitHubProfile {
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
}

export interface GitHubActivityPayload {
  profile: GitHubProfile;
  totalStars: number;
  totalContributions: number;
  displayStats: {
    repositoriesLabel: string;
    starsLabel: string;
    contributionsLabel: string;
  };
  topRepositories: GitHubRepo[];
  contributionMatrix: number[][]; // 12 months / 36 columns x 4 rows for compact visual grid
  source: 'live' | 'curated-fallback';
  fetchedAt: string;
}
