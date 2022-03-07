import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from './Navbar.module.scss'

const Navbar = () => {
  console.log('navbar component rendered');

  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const checkIfActive = ({ isActive }) => ( `${styles.navigation__link} ` + ( isActive ? `${styles['navigation__link--active']}` : "" ) );

  return (
    <nav className={styles.navigation}>
      <div className={styles.navigation__logo}>
        NOVI App
      </div>
      <ul className={styles.navigation__list}>
        <li className={styles.navigation__item}>
          <NavLink 
            to='/'
            className={checkIfActive} >Home</NavLink>
        </li>
        <li className={styles.navigation__item}>
          <NavLink 
            to='/dashboard'
            className={checkIfActive}>Dashboard</NavLink>
        </li>
        <li>
          <NavLink 
            to='/login'
            className={checkIfActive}>Inloggen</NavLink>
        </li>
        <li>
          <NavLink 
            to='/registreren'
            className={checkIfActive}>Registeren</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;