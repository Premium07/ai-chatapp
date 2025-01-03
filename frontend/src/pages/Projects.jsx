import { useLocation } from "react-router-dom";
import { FaPlus, FaUserGroup } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { LuSend } from "react-icons/lu";
import { FaUserAlt } from "react-icons/fa";
import { useContext, useEffect, useRef, useState } from "react";
import Markdown from "markdown-to-jsx";
import axios from "../config/axios";
import { initializeSocket, receiveMsg, sendMsg } from "../config/socket";
import { UserContext } from "../context/UserContext";
import hljs from "highlight.js";

function SyntaxHighlightedCode(props) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && props.className?.includes("lang-") && window.hljs) {
      window.hljs.highlightElement(ref.current);

      // hljs won't reprocess the element unless this attribute is removed
      ref.current.removeAttribute("data-highlighted");
    }
  }, [props.className, props.children]);

  return <code {...props} ref={ref} />;
}

const Projects = () => {
  const location = useLocation();

  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState([]);
  const [project, setProject] = useState(location.state.project);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const messageBoxRef = useRef(null);

  const [messages, setMessages] = useState([]);

  const { user } = useContext(UserContext);

  const handleUserClick = (id) => {
    setSelectedUserId((prevSelectedUserId) => {
      const newSelectedUserId = new Set(prevSelectedUserId);
      if (newSelectedUserId.has(id)) {
        newSelectedUserId.delete(id);
      } else {
        newSelectedUserId.add(id);
      }

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
    const newMessage = {
      message,
      sender: user,
    };

    sendMsg("project-message", newMessage);

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage("");
  };

  const aiResponseMessage = (message) => {
    const messageObj = JSON.parse(message);
    return (
      <div className="overflow-auto bg-slate-950 text-white rounded-sm p-2">
        <Markdown
          // eslint-disable-next-line react/no-children-prop
          children={messageObj.text}
          options={{ overrides: { code: SyntaxHighlightedCode } }}
        />
      </div>
    );
  };

  useEffect(() => {
    initializeSocket(project._id);

    receiveMsg("project-message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    axios
      .get(`/projects/getproject/${location.state.project._id}`)
      .then((res) => {
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
  }, [project._id, location.state.project._id]);

  useEffect(() => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  }, [messages]);

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
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`${
                  message.sender._id === "ai" ? "max-w-96" : " max-w-56"
                } ${
                  message.sender._id == user._id && "ml-auto"
                } flex flex-col bg-slate-50 w-fit rounded-md p-2`}
              >
                <small className="opacity-65 text-xs pb-2 font-semibold">
                  {message.sender.email}
                </small>
                <p className="text-sm">
                  {message.sender._id === "ai"
                    ? aiResponseMessage(message.message)
                    : message.message}
                </p>
              </div>
            ))}
          </div>
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
              onClick={sendMessage}
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
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
                    Array.from(selectedUserId).indexOf(user._id) !== -1
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
