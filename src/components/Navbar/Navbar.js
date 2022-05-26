import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from './Navbar.module.scss'
import useAuth from "../../hooks/useAuth";

const Navbar = (props) => {
  console.log('navbar component rendered');

  const handleClick = () => {
    props.authModal.current.openModal()
  };

  const checkIfActive = ({ isActive }) => ( `${styles.navigation__link} ` + ( isActive ? `${styles['navigation__link--active']}` : "" ) );

  return (
    <nav className={styles.navigation}>
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
        <li className={styles.navigation__item}>
          <NavLink 
            to='/about'
            className={checkIfActive}>About</NavLink>
        </li>
        <li className={styles.navigation__item}>
          <NavLink 
            to='/contact'
            className={checkIfActive}>Contact</NavLink>
        </li>
        <li className={styles.navigation__item}>
          <div className={styles['divider']}></div>
        </li>
        <li className={styles.navigation__item}>
          <button className={styles['btn']} onClick={handleClick}>Inloggen</button>
        </li>
        <li className={styles.navigation__item}>
          <button className={styles['btn--blue']} onClick={handleClick}>Registreren</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;