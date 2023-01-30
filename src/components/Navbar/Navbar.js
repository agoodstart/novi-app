import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faRightToBracket, faUser } from '@fortawesome/free-solid-svg-icons';

import Button from "../Button/Button";

import useTheme from "../../hooks/useTheme";
import useAuth from "../../hooks/useAuth";
import useLocalStorage from "../../hooks/useLocalStorage";

import styles from './Navbar.module.scss';

const Navbar = () => {
  const navigate = useNavigate();
  const [user, _setUser] = useLocalStorage("user", null);

  const {modalRef} = useAuth();
  const {colors} = useTheme();
  
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

        {/* if user exists --> button to profile; else --> Login & register buttons */}
        {user ? 
          <li className={styles.navigation__item}>
            <Button
            color={colors.background.tertiary.main}
            pill
            size="medium"
            elevation={2}
            onClick={() => { navigate('/profile')}}
            >
              <FontAwesomeIcon icon={faUser} /> &nbsp;
              Your Profile
            </Button>
          </li> : 
          <>
            <li className={styles.navigation__item}>

              <Button
                color={colors.background.primary.main}
                pill
                size="medium"
                elevation={2}
                onClick={handleOpenModal}
              >
                <FontAwesomeIcon icon={faRightToBracket} /> &nbsp;
                Login</Button>
            </li>
            <li className={styles.navigation__item}>
              <Button
                color={colors.background.tertiary.main}
                pill
                size="medium"
                elevation={2}
                onClick={handleOpenModal}
              >
                <FontAwesomeIcon icon={faUserPlus} /> &nbsp;
                Register
              </Button>
            </li>
          </>
        }
      </ul>
    </nav>
  );
};

export default Navbar;