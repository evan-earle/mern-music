import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import styles from "./Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import blankUser from "../../assets/blankUser.jpg";
import "animate.css";

export const Navbar = ({ search }) => {
  const [user, setUser] = useState(null);
  const [navSearch, setNavSearch] = useState("");
  const [clicked, setClicked] = useState(false);
  const [photo, setPhoto] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const showNavbar = () => {
    setClicked(!clicked);
  };

  const getUser = async () => {
    try {
      const { data } = await axios.get("/api/users/me");
      setUser(data);
      const photo = await axios.get(`/api/users/getPhoto`);
      !photo.data.image ? setPhoto(blankUser) : setPhoto(photo.data.image);
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

  const submitSearch = async (e) => {
    e.preventDefault();
    search(navSearch);
    try {
      await axios.put(`/api/users/lastSearch/${navSearch}`);
    } catch (err) {
      console.log(err);
    }
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
                placeholder="Enter artist"
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
        <img className={styles.profileImage} src={photo} alt="profile-photo" />
        <span className={styles.username}>{user.username}</span>
        {location.pathname === "/" ? (
          <Link to="/edit-profile">
            <a>Profile</a>
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
