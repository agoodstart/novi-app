import { NavLink } from "react-router-dom";
import Button from "../../components/Button/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthEurope, faGauge, faUser, faUserGroup, faRoute, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import useTheme from "../../hooks/useTheme";
import useAuth from "../../hooks/useAuth";

import styles from './Sidebar.module.scss';

export default function Sidebar() {
  const { colors } = useTheme();
  const { auth } = useAuth();

  const checkIfActive = ({ isActive }) => ( `${styles['sidebarnav__link']} ` + ( isActive ? `${styles['sidebarnav__link--active']}` : "" ) );

  return (
    <div className={styles['layout__sidebar']}>
      <nav className={styles['sidebarnav']}>
        <ul className={styles['sidebarnav__list']}>
          <li className={styles['sidebarnav__item']}>
            <NavLink 
              to='/dashboard'
              className={checkIfActive}>
                <FontAwesomeIcon icon={faGauge} /> &nbsp;
                Dashboard
            </NavLink>
          </li>
          <li className={styles['sidebarnav__item']}>
          <NavLink 
            to='/Destinations'
            className={checkIfActive}>
              <FontAwesomeIcon icon={faEarthEurope} /> &nbsp;
              Destinations
            </NavLink>
          </li>
          <li className={styles['sidebarnav__item']}>
          <NavLink 
            to='/profile'
            className={checkIfActive}>
              <FontAwesomeIcon icon={faUser} /> &nbsp;
              Profile
            </NavLink>
          </li>
          <li className={styles['sidebarnav__item']}>
          <NavLink 
            to='/social'
            className={checkIfActive}>
              <FontAwesomeIcon icon={faUserGroup} /> &nbsp; 
              Social
            </NavLink>
          </li>
          <li className={styles['sidebarnav__item']}>
          <NavLink 
            to='/addtravelplan'
            className={checkIfActive}>
              <FontAwesomeIcon icon={faRoute} /> &nbsp;
              Add Travel Plan
            </NavLink>
          </li>
          <li className={styles['sidebarnav__item']}>
          </li>
        </ul>
      </nav>
      <Button 
        size="medium" 
        elevation={1} 
        color={colors.background.secondary.alpha['80']} 
        onClick={() => auth.signout()} 
        customStyles={{
        margin: '0 1rem'
      }}>
        <FontAwesomeIcon icon={faRightFromBracket} /> &nbsp;
        Logout
      </Button>
    </div>
  )
}