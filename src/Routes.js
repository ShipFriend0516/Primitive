import MainPage from "./Pages/MainPage";
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
];

export default routes;
