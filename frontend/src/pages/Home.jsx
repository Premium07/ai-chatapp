import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { IoIosAddCircleOutline } from "react-icons/io";
import axios from "../config/axios";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");

  const { user } = useContext(UserContext);

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
        console.log(projectName);
      })
      .catch((error) => {
        console.error(error);
      });
    setProjectName("");
  };

  return (
    <main className="p-4">
      <section>
        <button
          className="p-4 border border-slate-300 rounded-md flex items-center gap-2"
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          <span className="font-semibold text-zinc-600">New Project</span>
          <IoIosAddCircleOutline className="text-xl" />
        </button>
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
                  className="w-full px-3 py-2  border border-gray-600 rounded focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-400 hover:bg-gray-500 rounded-md text-black mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white"
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
