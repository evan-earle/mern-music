import { Register } from "../components/auth/Register";
import { Login } from "../components/auth/Login";
import userAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const Auth = () => {
  const [authType, setAuthType] = useState("signin");
  const { auth } = userAuth();
  const navigate = useNavigate();

  const changeAuthType = (auth) => {
    setAuthType(auth);
  };

  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, [auth, navigate]);

  if (authType === "signin") {
    return (
      <div className="auth">
        <Login authType={changeAuthType} />
      </div>
    );
  } else {
    return (
      <div className="auth">
        <Register authType={changeAuthType} />
      </div>
    );
  }
};
