import { Link, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.css";
import ProfileIcon from "../../icons/ProfileIcon";
import AboutIcon from "../../icons/AboutIcon";
import FriendsIcon from "../../icons/FriendsIcon";
import RequirementIcon from "../../icons/RequireListing";
import { List } from "@mui/material";
import RecentActorsIcon from '@mui/icons-material/RecentActors';


const Sidebar = () => {
  const location = useLocation();

  const isActive = (currentPath, pagePath) => {
    if (currentPath === pagePath) return styles.active;
    else return "";
  };

  return (
    <div className={styles.parent}>
      <label className={styles["hamburger-menu"]}>
        <input type='checkbox' />
      </label>
      <div className={styles.sidebar}>
        <nav className={styles.nav}>
          <Link
            to={"/profile"}
            className={`${styles.navItem} ${isActive(
              location.pathname,
              "/profile"
            )}`}
          >
            <div className={styles.menuDiv}>
              <div className={styles.svgIcon}>
                <ProfileIcon />
              </div>
              <div className={styles.menuText}>Profile</div>
            </div>
          </Link>
          <Link
            to={"/requirement"}
            className={`${styles.navItem}  ${isActive(
              location.pathname,
              "/requirement"
            )}`}
          >
            {" "}
            <div className={styles.menuDiv}>
              <div className={styles.svgIcon}>
                <FriendsIcon />
              </div>
              <div className={styles.menuText}>Referral</div>
            </div>
          </Link>
          <Link
            to={"/entity"}
            className={`${styles.navItem}  ${isActive(
              location.pathname,
              "/entity"
            )}`}
          >
            {" "}
            <div className={styles.menuDiv}>
              <div className={styles.svgIcon}>
                <AboutIcon />
              </div>
              <div className={styles.menuText}>Enity</div>
            </div>
          </Link>
          <Link
            to={"/register"}
            className={`${styles.navItem}  ${isActive(
              location.pathname,
              "/register"
            )}`}
          >
            {" "}
            <div className={styles.menuDiv}>
              <div className={styles.svgIcon}>
             
              <ProfileIcon />
              </div>
              <div className={styles.menuText}>register</div>
            </div>
          </Link>
          <Link
            to={"/list"}
            className={`${styles.navItem}  ${isActive(
              location.pathname,
              "/list"
            )}`}
          >
            {" "}
            <div className={styles.menuDiv}>
              <div className={styles.svgIcon}>
              <RecentActorsIcon />              </div>
              <div className={styles.menuText}>register</div>
            </div>
          </Link>
          <Link
            to={"/list1"}
            className={`${styles.navItem}  ${isActive(
              location.pathname,
              "/list"
            )}`}
          >
            {" "}
            <div className={styles.menuDiv}>
              <div className={styles.svgIcon}>
              <RequirementIcon />
              </div>
              <div className={styles.menuText}>register</div>
            </div>
          </Link>
          <Link
            to={"/agg"}
            className={`${styles.navItem}  ${isActive(
              location.pathname,
              "/agg"
            )}`}
          >
            {" "}
            <div className={styles.menuDiv}>
              <div className={styles.svgIcon}>
              <RequirementIcon />
              </div>
              <div className={styles.menuText}>register</div>
            </div>
          </Link>
        </nav>
      </div>
    </div>
  );
};
export default Sidebar;
