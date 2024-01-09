import RecruitPage from "./Pages/RecruitPage";
import MainPage from "./Pages/MainPage";
import MembersPage from "./Pages/MembersPage";
import ProjectPage from "./Pages/ProjectPage";
import LoginPage from "./Pages/LoginPage";

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
    element: <LoginPage />,
    path: "/login",
  },
];

export default routes;
