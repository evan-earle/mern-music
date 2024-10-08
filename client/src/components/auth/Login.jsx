import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "animate.css";
import styles from "./Auth.module.css";

export const Login = ({ authType }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/login", {
        username,
        password,
      });
      const firstLogin = await axios.get("/api/users/me");
      firstLogin.data.firstLogin === true ? navigate("/search") : navigate("/");
      toast.success("Signed in");
      await axios.put("/api/users/firstLogin");
    } catch (err) {
      console.log(err);
      toast.error("Signin failed");
    }
  };

  return (
    <div className={styles["Auth-form-container"]}>
      <form
        className={`${styles["Auth-form"]} animate__animated animate__fadeInLeft
        `}
        onSubmit={onSubmit}
      >
        <div className={styles["Auth-form-content"]}>
          <h3 className={styles["Auth-form-title"]}>Sign In</h3>
          <div className="text-center">
            Not registered yet?{" "}
            <span
              className={`${styles["link-primary"]} link-primary`}
              onClick={() => authType("signup")}
            >
              Sign Up
            </span>
          </div>
          <div className="form-group mt-3">
            <label htmlFor="username">Username</label>
            <input
              className="form-control mt-1"
              required
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="password">Password</label>
            <input
              className="form-control mt-1"
              required
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button className="btn btn-primary" type="submit">
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
