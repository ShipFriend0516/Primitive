// GitHub URL에서 사용자명과 레포지토리 이름을 추출하는 유틸리티 함수
export const extractGitHubInfo = (githubUrl: string) => {
  try {
    const url = new URL(githubUrl);
    const [, username, repo] = url.pathname.split("/");
    return { username, repo };
  } catch (error) {
    console.error("Invalid GitHub URL:", error);
    return null;
  }
};
