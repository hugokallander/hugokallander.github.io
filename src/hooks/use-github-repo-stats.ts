import { useQuery } from "@tanstack/react-query";

export interface GithubRepoStats {
  stars: number;
  forks: number;
}

async function fetchRepoStats(repo: string): Promise<GithubRepoStats | null> {
  // repo is expected to be in the form "owner/name".
  const res = await fetch(`https://api.github.com/repos/${repo}`, {
    headers: {
      Accept: "application/vnd.github+json",
    },
  });

  if (!res.ok) {
    // 403 likely rate-limit; 404 if repo does not exist.
    return null;
  }

  const data = (await res.json()) as {
    stargazers_count?: number;
    forks_count?: number;
  };

  return {
    stars: Math.max(0, data.stargazers_count ?? 0),
    forks: Math.max(0, data.forks_count ?? 0),
  };
}

export function useGithubRepoStats(repo?: string) {
  return useQuery({
    queryKey: ["github-repo-stats", repo],
    queryFn: () => fetchRepoStats(repo as string),
    enabled: Boolean(repo),
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
    retry: 1,
  });
}
