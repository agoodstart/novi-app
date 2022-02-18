import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { MenuList } from "./MenuList";
import "./Navbar.css";

const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const menuList = MenuList.map(({ url, title }, index) => {
    return (
      <li key={index}>
        <NavLink to={url}>
          {title}
        </NavLink>
      </li>
    );
  });

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <nav>
      <div className="logo">
        VPN<font>Lab</font>
      </div>
      <ul className={clicked ? "menu-list" : "menu-list close"}>
        {menuList}
        <li>
          <NavLink to='/profile'>profiel</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;