import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from './Navbar.module.scss'
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const {modalRef} = useAuth();
  console.log('navbar component rendered');

  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    modalRef.current.openModal()
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
          <button onClick={handleClick}>Inloggen</button>
        </li>
        <li>
          <button onClick={handleClick}>Registreren</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;