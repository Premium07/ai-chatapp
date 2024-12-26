import { useLocation } from "react-router-dom";
import { FaUserGroup } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { LuSend } from "react-icons/lu";
import { FaUserAlt } from "react-icons/fa";

import { useState } from "react";

const Projects = () => {
  const location = useLocation();

  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

  // console.log(location.state);

  return (
    <main className="h-screen w-screen flex">
      <section className="relative h-full flex flex-col min-w-96 bg-slate-300">
        <header className="flex justify-end p-2 px-4 w-full bg-slate-100">
          <button
            className="p-2"
            onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
          >
            <FaUserGroup />
          </button>
        </header>
        <section className="flex-grow flex flex-col">
          <div className="flex-grow flex flex-col gap-2 p-1">
            <div className="incoming-msg max-w-56 flex flex-col bg-slate-50 w-fit rounded-md p-2 ">
              <small className="opacity-65 text-xs">example@gmail.com</small>
              <p className="text-sm font-semibold">
                Lorem ipsum dolor sit. Lorem ipsum dolor sit.
              </p>
            </div>
            <div className="outgoing-msg max-w-56 ml-auto flex flex-col bg-slate-50 w-fit rounded-md p-2 ">
              <small className="opacity-65 text-xs font-normal">
                example@gmail.com
              </small>
              <p className="text-sm font-semibold">Lorem ipsum dolor sit.</p>
            </div>
          </div>
          <div className="flex items-center w-full bg-slate-100">
            <input
              className="p-2 px-4 w-full outline-none"
              type="text"
              placeholder="Enter message"
              name=""
            />
            <button className="w-flex-grow h-full px-4 bg-slate-700 text-white">
              <LuSend size={20} />
            </button>
          </div>
        </section>

        <div
          className={`sidepanel flex flex-col gap-2 w-full h-full bg-slate-50 transition-all absolute ${
            isSidePanelOpen ? "translate-x-0" : "-translate-x-full"
          } top-0`}
        >
          <header className="w-full flex justify-end p-2 px-3 bg-slate-200">
            <button className="p-2" onClick={() => setIsSidePanelOpen(false)}>
              <IoCloseSharp size={25} />
            </button>
          </header>

          <div className="users flex flex-col gap-2">
            <div className="user flex items-center gap-2 cursor-pointer hover:bg-slate-200 p-2">
              <div className=" aspect-square rounded-full size-fit flex items-center justify-center p-2 bg-slate-600 text-white">
                <FaUserAlt />
              </div>
              <h2 className="font-semibold text-lg">username</h2>
            </div>
          </div>
        </div>
      </section>
      <section></section>
    </main>
  );
};

export default Projects;
