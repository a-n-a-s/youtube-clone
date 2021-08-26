import React , {useState} from "react";
import "./header.css";
import { FaBars } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { MdNotifications, MdApps } from "react-icons/md";
import { RiVideoAddFill } from "react-icons/ri";

import { useHistory } from "react-router-dom";

const Header = ({ handleToggleSidebar }) => {
  const [input, setInput] = useState("");

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    history.push(`/search/${input}`)
  }
  return (
    <div className="header">
      <FaBars
        className="header_menu"
        size={26}
        onClick={() => {
          handleToggleSidebar();
        }}
      />
      <img
        src="https://download.logo.wine/logo/YouTube/YouTube-White-Full-Color-Logo.wine.png"
        alt=""
        className="header_logo"
      />
      <form onSubmit={handleSubmit} >
        <input type="text" placeholder="Search" value={input} onChange={e => setInput(e.target.value)} />
        <button>
          <AiOutlineSearch size={22} />
        </button>
      </form>

      <div className="header_icons">
        <RiVideoAddFill size={22} className="hover_effect" />
        <MdApps size={22} className="hover_effect" />
        <MdNotifications size={22} className="hover_effect" />
        <img
          src="https://yt3.ggpht.com/IEWg4-eNZ6CLh_Y3Q5exPKhAc28B_V7QzufdZ2FUrlgtjBpiQwxS9yiiBLS1r1ngFSn8k3NWhw=s88-c-k-c0x00ffffff-no-rj-mo"
          alt="avatar"
        />
      </div>
    </div>
  );
};

export default Header;
