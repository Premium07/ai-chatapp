import { useLocation } from "react-router-dom";
import { FaUserGroup } from "react-icons/fa6";
import { LuSend } from "react-icons/lu";

const Projects = () => {
  const location = useLocation();

  // console.log(location.state);

  return (
    <main className="h-screen w-screen flex">
      <section className="relative h-full flex flex-col min-w-72 bg-slate-300">
        <header className="flex justify-end p-2 px-4 w-full bg-slate-100">
          <button className="p-2">
            <FaUserGroup />
          </button>
        </header>
        <section className="flex-grow flex flex-col">
          <div className="flex-grow flex flex-col gap-2 p-1">
            <div className="incoming-msg max-w-56 flex flex-col bg-slate-50 w-fit rounded-md p-2 ">
              <small className="opacity-65 text-xs">example@gmail.com</small>
              <p className="text-sm">
                Lorem ipsum dolor sit. Lorem ipsum dolor sit.
              </p>
            </div>
            <div className="outgoing-msg max-w-56 ml-auto flex flex-col bg-slate-50 w-fit rounded-md p-2 ">
              <small className="opacity-65 text-xs">example@gmail.com</small>
              <p className="text-sm">Lorem ipsum dolor sit.</p>
            </div>
          </div>
          <div className="flex items-center w-full bg-slate-100">
            <input
              className="p-2 px-4 outline-none"
              type="text"
              placeholder="Enter message"
              name=""
            />
            <button className="flex-grow px-3">
              <LuSend />
            </button>
          </div>
        </section>

        <div className="sidepanel w-full h-60 bg-red-500 absolute -left-full top-0"></div>
      </section>
      <section></section>
    </main>
  );
};

export default Projects;
