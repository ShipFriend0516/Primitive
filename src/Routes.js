import RecruitPage from "./Pages/RecruitPage";
import MainPage from "./Pages/MainPage";
import MembersPage from "./Pages/MembersPage";
import ProjectPage from "./Pages/ProjectPage";
import ErrorPage from "./Pages/ErrorPage";
import TestPage from "./Pages/TestPage";

const routes = [
  {
    element: <MainPage />,
    path: "/",
  },
  {
    element: <ProjectPage />,
    path: "/project",
  },
  {
    element: <MembersPage />,
    path: "/members",
  },
  {
    element: <RecruitPage />,
    path: "/recruit",
  },
  {
    element: <TestPage />,
    path: "/test",
  },
  {
    element: <ErrorPage />,
    path: "/*",
  },
];

export default routes;
