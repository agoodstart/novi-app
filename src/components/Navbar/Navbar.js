import React, { useState } from "react";
import { NavLink } from "react-router-dom";
// import "./Navbar.css";
import styles from './Navbar.module.scss'

const Navbar = () => {
  console.log('navbar component rendered');

  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const checkIfActive = isActive => isActive ? `${styles['navigation__link']} ${styles['navigation__link--active']}` : `${styles['navigation__link']}`;

  return (
    <nav className={styles.navigation}>
      <div className={styles.navigation__logo}>
        NOVI App
      </div>
      <ul className={styles.navigation__list}>
        <li className={styles.navigation__item}>
          <NavLink 
            to='/'
            className={isActive => isActive ? `${styles['navigation__link']} ${styles['navigation__link--active']}` : `${styles['navigation__link']}`} >Home</NavLink>
        </li>
        <li>
          <NavLink 
            to='/dashboard'
            className={isActive => isActive ? `${styles['navigation__link']} ${styles['navigation__link--active']}` : `${styles['navigation__link']}`}>Dashboard</NavLink>
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