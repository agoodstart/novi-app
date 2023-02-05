import { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthEurope, faGauge, faUser, faUserGroup, faRoute, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import useAuth from "../../hooks/useAuth";

import styles from './Sidebar.module.scss';

export default function Sidebar() {
  const nodeRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const signoutUser = () => {
    
  }

  const handleOpenDrawer = (e) => {
    setIsOpen(true)
  }

  const handleCloseDrawer = (e) => {
    setIsOpen(false);
  }

  const { auth } = useAuth();

  const checkIfActive = ({ isActive }) => ( `${styles['sidebarnav__link']} ` + ( isActive ? `${styles['sidebarnav__link--active']}` : "" ) );
  const logout = () => `${styles['sidebarnav__link']} ${styles['sidebarnav__link--logout']}`

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={{ entry: 200, exit: 0 }}
      classNames={{
        enter: styles['drawer-enter'],
        enterActive: styles['drawer-active-enter'],
        enterDone: styles['drawer-done-enter'],
        exit: styles['drawer-exit'],
        exitActive: styles['drawer-active-exit'],
        exitDone: styles['drawer-done-exit'],
      }}
    >
      <div className={styles['layout__sidebar']} onMouseEnter={handleOpenDrawer} onMouseLeave={handleCloseDrawer} ref={nodeRef}>
        <nav className={styles['sidebarnav']}>
          <ul className={styles['sidebarnav__list']}>
            <li className={styles['sidebarnav__item']}>
              <NavLink 
                to='/dashboard'
                className={checkIfActive}>
                  <FontAwesomeIcon icon={faGauge} size="2x" className={styles['sidebarnav__icon']} /> &nbsp;
                  <span>Dashboard</span>
              </NavLink>
            </li>
            <li className={styles['sidebarnav__item']}>
            <NavLink 
              to='/Destinations'
              className={checkIfActive}>
                <FontAwesomeIcon icon={faEarthEurope} size="2x" className={styles['sidebarnav__icon']} /> &nbsp;
                <span>Destinations</span>
              </NavLink>
            </li>
            <li className={styles['sidebarnav__item']}>
            <NavLink 
              to='/profile'
              className={checkIfActive}>
                <FontAwesomeIcon icon={faUser} size="2x" className={styles['sidebarnav__icon']} /> &nbsp;
                <span>Profile</span>
              </NavLink>
            </li>
            <li className={styles['sidebarnav__item']}>
            <NavLink 
              to='/social'
              className={checkIfActive}>
                <FontAwesomeIcon icon={faUserGroup} size="2x" className={styles['sidebarnav__icon']} /> &nbsp; 
                <span>Social</span>
              </NavLink>
            </li>
            <li className={styles['sidebarnav__item']}>
            <NavLink 
              to='/addtravelplan'
              className={checkIfActive}>
                <FontAwesomeIcon icon={faRoute} size="2x" className={styles['sidebarnav__icon']} /> &nbsp;
                <span>Add Travel Plan</span>
              </NavLink>
            </li>
            <li className={styles['sidebarnav__item']}>
            </li>
            <li className={styles['sidebarnav__item']}>
            <NavLink 
              onClick={() => auth.signout()}
              className={logout}>
                <FontAwesomeIcon icon={faRightFromBracket} size="2x" className={styles['sidebarnav__icon']} /> &nbsp;
                <span>Logout</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </CSSTransition>
  )
}