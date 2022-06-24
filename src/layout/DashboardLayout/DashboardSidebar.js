import { NavLink } from "react-router-dom";

export default function DashboardSidebar({styles}) {

  const checkIfActive = ({ isActive }) => ( `${styles['sidebarnav__link']} ` + ( isActive ? `${styles['sidebarnav__link--active']}` : "" ) );

  return (
    <div className={styles['layout__sidebar']}>
      <div className={styles['logo']}>

      </div>

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
            to='/account'
            className={checkIfActive}>Account</NavLink>
          </li>
          <li className={styles['sidebarnav__item']}>
          <NavLink 
            to='/social'
            className={checkIfActive}>Social</NavLink>
          </li>

          <li>
            <div></div>
          </li>

          <li className={styles['sidebarnav__item']}>
          <NavLink 
            to='/addtravelplan'
            className={checkIfActive}>Add Travel Plan</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}