import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import styles from "./EditProfileForm.module.css";
import PulseLoader from "react-spinners/PulseLoader";

export const EditProfileForm = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({ username: "", password: "" });

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/users/me");
        setUser(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const updateUserInfo = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put("/api/users/me", user);
      toast.success("Profile updated");
      setUser(res.data);
      setTimeout(() => {
        window.location.reload(false);
      }, 1000);
    } catch (err) {
      console.log(err);
      if (err.response.data.message === "User already exists") {
        toast.error("User already exists");
      }
    }
  };

  return (
    <div className={styles["Auth-form-container"]}>
      {loading ? (
        <PulseLoader
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "3rem",
          }}
          color="#00000060"
        />
      ) : (
        <form
          className={`${styles["Auth-form"]} animate__animated animate__fadeInLeft"`}
          onSubmit={updateProfile}
        >
          <div className={styles["Auth-form-content"]}>
            <h3 className={styles["Auth-form-title"]}>Edit Profile</h3>
            <div className="form-group mt-3">
              <label htmlFor="username">Username</label>
              <input
                className="form-control mt-1"
                type="text"
                name="username"
                required
                value={user.username}
                onChange={updateUserInfo}
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="password">Password</label>
              <input
                className="form-control mt-1"
                type="password"
                name="password"
                required
                onChange={updateUserInfo}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button className="btn btn-primary" type="submit">
                Save
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
