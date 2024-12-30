import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const UserAuth = ({ children }) => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
    if (!token || !user) {
      navigate("/login");
    }
  }, [token, user, navigate]);

  if (loading)
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="size-12 rounded-full border-2 border-t-2 border-t-slate-200 animate-spin"></div>
      </div>
    );

  return <>{children}</>;
};

export default UserAuth;
