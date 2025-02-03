import { extractGitHubInfo } from "@/src/Utils/extract";

export const getGitHubStars = async (githubUrl: string) => {
  const githubInfo = extractGitHubInfo(githubUrl);

  if (!githubInfo) return null;

  try {
    const response = await fetch(
      `https://api.github.com/repos/${githubInfo.username}/${githubInfo.repo}`,
    );

    if (!response.ok) {
      throw new Error("GitHub API request failed");
    }

    const data = await response.json();
    console.log(data);
    return data.stargazers_count;
  } catch (error) {
    console.error("Failed to fetch GitHub stars:", error);
    return null;
  }
};
