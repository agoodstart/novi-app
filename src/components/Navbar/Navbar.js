import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from './Navbar.module.scss';
import Button from "../Button/Button";
import useTheme from "../../hooks/useTheme";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const {modalRef} = useAuth();
  const {colors} = useTheme();
  console.log('navbar component rendered');

  const handleOpenModal = () => {
    modalRef.current.openModal();
  }

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
          <Button
            color={colors.background.primary.main}
            pill
            size="medium"
            elevation={2}
            onClick={handleOpenModal}
          >Inloggen</Button>
        </li>
        <li className={styles.navigation__item}>
        <Button
            color={colors.background.tertiary.main}
            pill
            size="medium"
            elevation={2}
            onClick={handleOpenModal}
          >Registreren</Button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;