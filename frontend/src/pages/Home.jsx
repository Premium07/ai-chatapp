import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoPerson } from "react-icons/io5";

import axios from "../config/axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [project, setProject] = useState([]);

  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const createProject = (e) => {
    e.preventDefault();
    // Handle project creation logic here
    axios
      .post("/projects/create", {
        name: projectName,
      })
      .then((response) => {
        console.log(response.data);
        setIsModalOpen(false);
        // console.log(projectName);
      })
      .catch((error) => {
        console.error(error);
      });
    setProjectName("");
  };

  useEffect(() => {
    axios
      .get("/projects/allprojects")
      .then((response) => {
        // console.log(response.data.projects);
        setProject(response.data.projects);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <main className="p-4">
      <section className="flex flex-wrap gap-4">
        <button
          className="p-4 border border-slate-300 rounded-md flex items-center gap-2"
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          <span className="font-semibold text-zinc-600">New Project</span>
          <IoIosAddCircleOutline className="text-xl" />
        </button>

        {project?.map((project) => (
          <div
            key={project._id}
            onClick={() => navigate(`/projects`, { state: { project } })}
            className="p-4 border flex flex-col gap-2 border-slate-300 rounded-md min-w-52 hover:bg-slate-200 cursor-pointer"
          >
            <h3 className="font-semibold text-zinc-600">{project.name}</h3>

            <div className="flex items-center gap-4">
              {" "}
              <p>
                <small className="flex items-center gap-1 font-semibold">
                  <IoPerson /> Collaborators:
                </small>{" "}
              </p>
              {project.users.length}
            </div>
          </div>
        ))}
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black text-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Create Project
            </h2>
            <form onSubmit={createProject}>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="projectName"
                >
                  Project Name
                </label>
                <input
                  type="text"
                  id="projectName"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 font-semibold hover:bg-gray-300 rounded-md text-black mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 font-semibold hover:bg-blue-700 rounded-md text-white"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
