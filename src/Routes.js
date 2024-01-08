import MainPage from "./Pages/MainPage";
import MembersPage from "./Pages/MembersPage";
import ProjectPage from "./Pages/ProjectPage";

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
];

export default routes;
