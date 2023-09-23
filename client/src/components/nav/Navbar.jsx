import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import styles from "./Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "animate.css";

export const Navbar = ({ search }) => {
  const [user, setUser] = useState(null);
  const [navSearch, setNavSearch] = useState("");
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const showNavbar = () => {
    setClicked(!clicked);
  };

  const getUser = async () => {
    try {
      const { data } = await axios.get("/api/users/me");
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) return null;

  const handleLogout = async () => {
    try {
      await axios.get("/api/auth/logout");
      setUser(null);
      toast.success("Signed out");
      navigate("/auth");
    } catch (err) {
      console.log(err);
    }
  };

  const submitSearch = (e) => {
    e.preventDefault();
    search(navSearch);
    setNavSearch("");
  };

  return (
    <header>
      {!location.pathname === "/search" ||
        location.pathname === "/edit-profile" || (
          <form onSubmit={submitSearch}>
            <div className={styles["search-container"]}>
              <input
                className="form-control"
                type="text"
                placeholder="Enter city"
                onChange={(e) => setNavSearch(e.target.value)}
                value={navSearch}
                onSubmit={submitSearch}
              />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className={styles.FontAwesomeGlass}
              />
            </div>
          </form>
        )}
      <nav
        className={
          clicked
            ? `${styles["active"]} ${styles.animate} animate__animated animate__fadeInDown`
            : ` ${styles.animate} animate__animated animate__fadeInUp`
        }
      >
        <span>{user.username}</span>

        {location.pathname === "/" ? (
          <Link to="/edit-profile">
            <a>Edit Profile</a>
          </Link>
        ) : (
          <Link to="/">Home</Link>
        )}
        <a onClick={handleLogout}>Logout</a>
      </nav>
      <button onClick={showNavbar} className={styles.hamburger}>
        <FontAwesomeIcon icon={faBars} />
      </button>
    </header>
  );
};
