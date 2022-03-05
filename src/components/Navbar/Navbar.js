import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <nav>
      <div className="logo">
        NOVI App
      </div>
      <ul className={clicked ? "menu-list" : "menu-list close"}>
        {/* {menuList} */}
        <li>
          <NavLink to='/'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/dashboard'>Dashboard</NavLink>
        </li>
        <li>
          <button onClick={() => {}}>Login</button>
        </li>
        <li>
          <NavLink to='/registreren'>Registeren</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;