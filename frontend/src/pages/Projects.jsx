import { useLocation } from "react-router-dom";
import { FaUserGroup } from "react-icons/fa6";

const Projects = () => {
  const location = useLocation();

  // console.log(location.state);

  return (
    <main className="h-screen w-screen flex">
      <section className="h-full min-w-60 bg-red-400">
        <header className="flex justify-end p-2 px-4 w-full bg-slate-200">
          <button className="p-2">
            <FaUserGroup />
          </button>
        </header>
      </section>
      <section></section>
    </main>
  );
};

export default Projects;
