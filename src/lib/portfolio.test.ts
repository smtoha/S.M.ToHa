import test from 'node:test';
import assert from 'node:assert/strict';
import {
  rankRepositories,
  calculateTotalStars,
  filterProjects,
  generateContributionMatrix,
} from './project-ranking';
import { validateContactInput } from './validators';
import { projects, fallbackGitHubRepos } from './site-data';
import { GitHubRepo } from '../types/github';

test('calculateTotalStars sums stargazers accurately across repositories', () => {
  const total = calculateTotalStars(fallbackGitHubRepos);
  assert.equal(total, 120 + 95 + 72 + 48 + 36);
  assert.equal(calculateTotalStars([]), 0);
});

test('rankRepositories prioritizes non-fork, non-archived repos by score and stars', () => {
  const sample: GitHubRepo[] = [
    {
      name: 'ForkedRepo',
      html_url: 'https://github.com/toha129/ForkedRepo',
      description: 'A forked repo with many stars',
      language: 'JavaScript',
      stargazers_count: 50,
      forks_count: 5,
      updated_at: '2026-01-01T00:00:00Z',
      fork: true,
      archived: false,
    },
    {
      name: 'ArchivedRepo',
      html_url: 'https://github.com/toha129/ArchivedRepo',
      description: 'An archived repository',
      language: 'Python',
      stargazers_count: 500,
      forks_count: 20,
      updated_at: '2026-01-01T00:00:00Z',
      fork: false,
      archived: true,
    },
    {
      name: 'PrimaryProject',
      html_url: 'https://github.com/toha129/PrimaryProject',
      description: 'Original project with solid documentation and stars',
      language: 'TypeScript',
      stargazers_count: 45,
      forks_count: 8,
      updated_at: '2026-05-01T00:00:00Z',
      fork: false,
      archived: false,
    },
  ];

  const ranked = rankRepositories(sample, 5);
  assert.equal(ranked.length, 2); // Archived is excluded
  assert.equal(ranked[0].name, 'PrimaryProject');
  assert.equal(ranked[1].name, 'ForkedRepo');
});

test('filterProjects returns 4 featured projects by default and all 6 when showAll is true', () => {
  const initial = filterProjects(projects, { showAll: false });
  assert.equal(initial.length, 4);
  assert.deepEqual(
    initial.map((p) => p.name),
    ['ShopixxoBD', 'TradingSpark', 'Tender Package Builder', 'IoT Energy Monitor']
  );

  const expanded = filterProjects(projects, { showAll: true });
  assert.equal(expanded.length, 6);

  const aiOnly = filterProjects(projects, { showAll: true, category: 'AI' });
  assert.equal(aiOnly.length, 2);

  const searched = filterProjects(projects, { showAll: true, query: 'ESP32' });
  assert.equal(searched.length, 1);
  assert.equal(searched[0].id, 'iot-energy-monitor');
});

test('generateContributionMatrix returns 4x36 deterministic grid with values 0..4', () => {
  const grid = generateContributionMatrix(129);
  assert.equal(grid.length, 4);
  assert.equal(grid[0].length, 36);
  for (const row of grid) {
    for (const cell of row) {
      assert.ok(cell >= 0 && cell <= 4);
    }
  }
});

test('validateContactInput rejects invalid inputs and sanitizes valid submissions', () => {
  const emptyResult = validateContactInput({ name: '', email: 'bad-email', message: 'short' });
  assert.equal(emptyResult.valid, false);
  assert.ok(emptyResult.errors.name);
  assert.ok(emptyResult.errors.email);
  assert.ok(emptyResult.errors.message);

  const validResult = validateContactInput({
    name: '  Sarah Ahmed  ',
    email: 'sarah@example.com',
    subject: '  IoT Consultation  ',
    message: 'Hello Toha, we would love to discuss an ESP32 telemetry prototype.',
  });
  assert.equal(validResult.valid, true);
  assert.equal(validResult.sanitized?.name, 'Sarah Ahmed');
  assert.equal(validResult.sanitized?.email, 'sarah@example.com');
  assert.equal(validResult.sanitized?.subject, 'IoT Consultation');
});
