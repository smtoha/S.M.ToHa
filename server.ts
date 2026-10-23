import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import {
  fallbackGitHubProfile,
  fallbackGitHubRepos,
} from './src/lib/site-data';
import {
  rankRepositories,
  calculateTotalStars,
  generateContributionMatrix,
} from './src/lib/project-ranking';
import { validateContactInput } from './src/lib/validators';
import { GitHubActivityPayload, GitHubProfile, GitHubRepo } from './src/types/github';

const PORT = 3000;

interface CachedGitHubEntry {
  payload: GitHubActivityPayload;
  expiresAt: number;
}

const githubCache = new Map<string, CachedGitHubEntry>();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export interface StoredInquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

const inquiries: StoredInquiry[] = [];

function createCuratedPayload(): GitHubActivityPayload {
  const ranked = rankRepositories(fallbackGitHubRepos, 5);
  return {
    profile: fallbackGitHubProfile,
    totalStars: calculateTotalStars(fallbackGitHubRepos),
    totalContributions: 142,
    displayStats: {
      repositoriesLabel: '20+',
      starsLabel: '50+',
      contributionsLabel: '100+',
    },
    topRepositories: ranked,
    contributionMatrix: generateContributionMatrix(129),
    source: 'curated-fallback',
    fetchedAt: new Date().toISOString(),
  };
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // API: GitHub profile + repositories with caching & rate-limit resilience
  app.get('/api/github', async (req, res) => {
    const username = String(req.query.username || 'toha129').trim() || 'toha129';
    const now = Date.now();
    const cached = githubCache.get(username);
    if (cached && cached.expiresAt > now) {
      res.json(cached.payload);
      return;
    }

    const headers: Record<string, string> = {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'SM-Toha-Portfolio-App',
    };
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    try {
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
          headers,
          signal: AbortSignal.timeout(4500),
        }),
        fetch(
          `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`,
          {
            headers,
            signal: AbortSignal.timeout(4500),
          }
        ),
      ]);

      if (!userRes.ok || !reposRes.ok) {
        const fallback = createCuratedPayload();
        githubCache.set(username, { payload: fallback, expiresAt: now + CACHE_TTL_MS });
        res.json(fallback);
        return;
      }

      const rawUser = (await userRes.json()) as Partial<GitHubProfile>;
      const rawRepos = (await reposRes.json()) as GitHubRepo[];

      if (!Array.isArray(rawRepos) || rawRepos.length === 0) {
        const fallback = createCuratedPayload();
        githubCache.set(username, { payload: fallback, expiresAt: now + CACHE_TTL_MS });
        res.json(fallback);
        return;
      }

      const ranked = rankRepositories(rawRepos, 5);
      const totalStars = calculateTotalStars(rawRepos);
      const repoCount = rawUser.public_repos ?? rawRepos.length;

      const payload: GitHubActivityPayload = {
        profile: {
          login: rawUser.login || username,
          name: rawUser.name || 'S.M. Toha',
          avatar_url: rawUser.avatar_url || fallbackGitHubProfile.avatar_url,
          html_url: rawUser.html_url || `https://github.com/${username}`,
          bio: rawUser.bio || fallbackGitHubProfile.bio,
          public_repos: repoCount,
          followers: rawUser.followers ?? 42,
          following: rawUser.following ?? 18,
        },
        totalStars,
        totalContributions: 142,
        displayStats: {
          repositoriesLabel: repoCount >= 20 ? `${repoCount}+` : '20+',
          starsLabel: totalStars >= 50 ? `${totalStars}+` : '50+',
          contributionsLabel: '100+',
        },
        topRepositories: ranked.length > 0 ? ranked : fallbackGitHubRepos,
        contributionMatrix: generateContributionMatrix(129),
        source: 'live',
        fetchedAt: new Date().toISOString(),
      };

      githubCache.set(username, { payload, expiresAt: now + CACHE_TTL_MS });
      res.json(payload);
    } catch {
      const fallback = createCuratedPayload();
      githubCache.set(username, { payload: fallback, expiresAt: now + CACHE_TTL_MS });
      res.json(fallback);
    }
  });

  // API: Contact Form Delivery
  app.post('/api/contact', (req, res) => {
    const validation = validateContactInput(req.body || {});
    if (!validation.valid || !validation.sanitized) {
      res.status(400).json({
        ok: false,
        errors: validation.errors,
      });
      return;
    }

    const entry: StoredInquiry = {
      id: `inq_${Date.now().toString(36)}`,
      ...validation.sanitized,
      createdAt: new Date().toISOString(),
    };

    inquiries.unshift(entry);
    try {
      fs.writeFileSync('/tmp/portfolio-inquiries.json', JSON.stringify(inquiries, null, 2));
    } catch {
      // Ignore write errors in restricted environments
    }

    res.status(201).json({
      ok: true,
      inquiry: entry,
      totalInquiries: inquiries.length,
    });
  });

  app.get('/api/contact', (_req, res) => {
    res.json({
      ok: true,
      inquiries,
    });
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`S.M. Toha Portfolio server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
