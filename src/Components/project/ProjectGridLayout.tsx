interface ProjectGridLayoutProps {
  children: React.ReactElement | React.ReactElement[];
}

const ProjectGridLayout = ({ children }: ProjectGridLayoutProps) => {
  return (
    <div
      id="projectGrid"
      className="w-4/5 mx-20 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3"
    >
      {children}
    </div>
  );
};
export default ProjectGridLayout;
