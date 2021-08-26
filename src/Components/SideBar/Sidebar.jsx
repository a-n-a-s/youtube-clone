import React from "react";
import "./sidebar.css";
import {
  MdSubscriptions,
  MdExitToApp,
  MdThumbUp,
  MdHistory,
  MdLibraryAdd,
  MdHome,
  MdSentimentDissatisfied,
} from "react-icons/md";
import { useDispatch } from "react-redux";
import { log_out } from "../../Redux/Actions/auth.action";
import { Link } from "react-router-dom";
const Sidebar = ({ sidebar, handleToggleSidebar }) => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(log_out());
  };
  return (
    <nav
      className={sidebar ? "sidebar open" : "sidebar"}
      onClick={() => handleToggleSidebar(false)}
    >
      <Link to='/'>
        <li>
          <MdHome size={23} />
          <span>Home</span>
        </li>
      </Link>
      <Link to="/feed/subs">
        <li>
          <MdSubscriptions size={23} />
          <span>Subscriptions</span>
        </li>
      </Link>

      <li>
        <MdThumbUp size={23} />
        <span>Liked Videos</span>
      </li>
      <li>
        <MdHistory size={23} />
        <span>History</span>
      </li>
      <hr />
      <li>
        <MdLibraryAdd size={23} />
        <span>Library</span>
      </li>
      <li>
        <MdSentimentDissatisfied size={23} />
        <span>I ODnt Know</span>
      </li>
      <li onClick={logoutHandler}>
        <MdExitToApp size={23} />
        <span>Log Out</span>
      </li>
    </nav>
  );
};

export default Sidebar;
