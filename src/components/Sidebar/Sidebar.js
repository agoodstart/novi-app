import { NavLink } from "react-router-dom";
import styles from './Sidebar.module.scss';

export default function Sidebar() {

  const checkIfActive = ({ isActive }) => ( `${styles['sidebarnav__link']} ` + ( isActive ? `${styles['sidebarnav__link--active']}` : "" ) );

  return (
    <div className={styles['sidebar']}>
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
            to='/account'
            className={checkIfActive}>Account</NavLink>
          </li>
          <li className={styles['sidebarnav__item']}>
          <NavLink 
            to='/checkendpoints'
            className={checkIfActive}>Check Endpoints</NavLink>
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