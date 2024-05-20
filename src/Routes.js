import RecruitPage from "./Pages/RecruitPage";
import MainPage from "./Pages/MainPage";
import MembersPage from "./Pages/MembersPage";
import ProjectPage from "./Pages/ProjectPage";
import ErrorPage from "./Pages/ErrorPage";
import TestPage from "./Pages/TestPage";
import AdminPage from "./Pages/AdminPage";
import ProjectDetailPage from "./Pages/ProjectDetailPage";
import LoginPage from "./Pages/LoginPage";

const routes = [
  {
    element: <MainPage />,
    path: "/",
  },
  {
    element: <LoginPage />,
    path: "/login",
  },
  {
    element: <ProjectPage />,
    path: "/project",
  },
  {
    element: <ProjectDetailPage />,
    path: "/project/:id",
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
    element: <AdminPage />,
    path: "/admin",
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
