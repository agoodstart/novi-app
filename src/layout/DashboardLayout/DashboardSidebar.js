import { NavLink } from "react-router-dom";
import Button from "../../components/Button/Button";

import useTheme from "../../hooks/useTheme";
import useAuth from "../../hooks/useAuth";

export default function DashboardSidebar({styles}) {
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
            className={checkIfActive}>Dashboard</NavLink>
          </li>
          <li className={styles['sidebarnav__item']}>
          <NavLink 
            to='/Destinations'
            className={checkIfActive}>Destinations</NavLink>
          </li>
          <li className={styles['sidebarnav__item']}>
          <NavLink 
            to='/profile'
            className={checkIfActive}>Profile</NavLink>
          </li>
          <li className={styles['sidebarnav__item']}>
          <NavLink 
            to='/social'
            className={checkIfActive}>Social</NavLink>
          </li>
          <li className={styles['sidebarnav__item']}>
          <NavLink 
            to='/addtravelplan'
            className={checkIfActive}>Add Travel Plan</NavLink>
          </li>
          <li className={styles['sidebarnav__item']}>
          </li>
        </ul>
      </nav>
      <Button size="medium" onClick={() => auth.signout()} elevation={1} color={colors.background.secondary.alpha['80']} customStyles={{
        margin: '0 1rem'
      }}>Logout</Button>
    </div>
  )
}