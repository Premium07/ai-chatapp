import { useLocation } from "react-router-dom";

const Projects = () => {
  const location = useLocation();

  console.log(location.state);
  return <div>Projects</div>;
};

export default Projects;
