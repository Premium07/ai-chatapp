import { useLocation } from "react-router-dom";
import { FaPlus, FaUserGroup } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { LuSend } from "react-icons/lu";
import { FaUserAlt } from "react-icons/fa";

import { useContext, useEffect, useRef, useState } from "react";
import axios from "../config/axios";
import { initializeSocket, receiveMsg, sendMsg } from "../config/socket";
import { UserContext } from "../context/UserContext";

const Projects = () => {
  const location = useLocation();
  
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState([]);
  const [project, setProject] = useState(location.state.project);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const messageBoxRef = useRef(null);

  const { user } = useContext(UserContext);

  const handleUserClick = (id) => {
    setSelectedUserId((prevSelectedUserId) => {
      const newSelectedUserId = new Set(prevSelectedUserId);
      if (newSelectedUserId.has(id)) {
        newSelectedUserId.delete(id);
      } else {
        newSelectedUserId.add(id);
      }

      // console.log(Array.from(newSelectedUserId));
      return newSelectedUserId;
    });
  };

  const addCollaborators = () => {
    axios
      .put("/projects/add-user", {
        projectId: location.state.project._id,
        users: Array.from(selectedUserId),
      })
      .then((res) => {
        console.log(res.data);
        setIsModalOpen(false);
      })
      .catch((err) => console.log(err));
  };

  const sendMessage = () => {
    sendMsg("project-message", {
      message,
      sender: user,
    });

    appendOutgoingMsg(message);

    setMessage("");
  };

  const appendIncomingMsg = (messageObj) => {
    const messageBox = document.querySelector(".messageBox");
    const message = document.createElement("div");
    message.classList.add(
      "max-w-56",
      "flex",
      "flex-col",
      "bg-slate-50",
      "w-fit",
      "rounded-md",
      "p-2"
    );
    message.innerHTML = `<small className='opacity-65 text-xs'>${messageObj.sender.email}</small>
    <p className='text-sm font-semibold'>${messageObj.message}</p>`;

    messageBox.appendChild(message);

    scrollToBottom();
  };

  const appendOutgoingMsg = (message) => {
    const messageBox = document.querySelector(".messageBox");
    const newMessage = document.createElement("div");
    newMessage.classList.add(
      "ml-auto",
      "max-w-56",
      "flex",
      "flex-col",
      "bg-slate-50",
      "w-fit",
      "rounded-md",
      "p-2"
    );
    newMessage.innerHTML = `<small className='opacity-65 text-xs'>${user.email}</small>
    <p className='text-sm font-semibold'>${message}</p>`;

    messageBox.appendChild(newMessage);

    scrollToBottom();
  };

  const scrollToBottom = () => {
    messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
  };

  useEffect(() => {
    initializeSocket(project._id);

    receiveMsg("project-message", (data) => {
      // console.log(data);
      appendIncomingMsg(data);
    });

    axios
      .get(`/projects/getproject/${location.state.project._id}`)
      .then((res) => {
        // console.log(res.data.project);
        setProject(res.data.project);
      })
      .catch((err) => console.log(err.message));

    axios
      .get("/users/allusers")
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main className="h-screen w-screen flex">
      <section className="relative h-full flex flex-col min-w-96 bg-slate-300">
        <header className="absolute top-0 flex justify-between items-center p-2 px-4 w-full bg-slate-100">
          <button
            className="flex items-center gap-1"
            onClick={() => setIsModalOpen(true)}
          >
            <FaPlus />
            <p className="text-sm">Add collaborator</p>
          </button>
          <button
            className="p-2"
            onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
          >
            <FaUserGroup />
          </button>
        </header>
        <section className="flex-grow flex flex-col pt-14 pb-12 h-full relative">
          <div
            ref={messageBoxRef}
            className="messageBox flex-grow flex flex-col gap-2 p-1 overflow-auto max-h-full"
          ></div>
          <div className="flex items-center w-full bg-slate-100 absolute bottom-0">
            <input
              className="p-2 px-4 w-full outline-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              placeholder="Enter message"
              name="message"
              required
            />
            <button
              onClick={message ? sendMessage : sendText}
              className="w-flex-grow h-full p-2 bg-slate-700 text-white"
            >
              <LuSend size={20} />
            </button>
          </div>
        </section>

        <div
          className={`sidepanel flex flex-col gap-2 w-full h-full bg-slate-50 transition-all absolute ${
            isSidePanelOpen ? "translate-x-0" : "-translate-x-full"
          } top-0`}
        >
          <header className="w-full flex justify-between items-center p-2 px-3 bg-slate-200">
            <h2 className="font-semibold text-lg">Collaborators</h2>
            <button className="p-2" onClick={() => setIsSidePanelOpen(false)}>
              <IoCloseSharp size={25} />
            </button>
          </header>

          <div className="users flex flex-col gap-2">
            {project.users?.length > 0 ? (
              project.users.map((user, index) => (
                <div
                  key={user._id || index}
                  className="user flex items-center gap-2 cursor-pointer hover:bg-slate-200 p-2"
                >
                  <div className="aspect-square rounded-full size-fit flex items-center justify-center p-2 bg-slate-600 text-white">
                    <FaUserAlt size={10} />
                  </div>
                  <h2 className="font-semibold">{user.email}</h2>
                </div>
              ))
            ) : (
              <p>No users found</p>
            )}
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          // onClick={() => setIsModalOpen(false)}
        >
          <div className="bg-white p-4 rounded-md w-96 max-w-full relative">
            <header className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Select User</h2>
              <button onClick={() => setIsModalOpen(false)}>
                <IoCloseSharp size={25} />
              </button>
            </header>
            <div className="flex flex-col gap-2 mb-16 max-h-96 overflow-y-auto">
              {users.map((user) => (
                <div
                  key={user._id}
                  className={`p-2 cursor-pointer hover:bg-slate-200 ${
                    Array.from(selectedUserId).indexOf(user._id) != -1
                      ? "bg-slate-200"
                      : ""
                  } flex items-center gap-2`}
                  onClick={() => handleUserClick(user._id)}
                >
                  <div className=" aspect-square rounded-full size-fit flex items-center justify-center p-2 bg-slate-600 text-white">
                    <FaUserAlt />
                  </div>
                  {user.email}
                </div>
              ))}
            </div>
            <button
              onClick={addCollaborators}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 p-2 px-4 rounded-md text-white mx-auto"
            >
              Add Collaborators
            </button>
          </div>
        </div>
      )}
      <section></section>
    </main>
  );
};

export default Projects;
