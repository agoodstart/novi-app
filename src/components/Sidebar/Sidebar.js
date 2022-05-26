import { NavLink } from "react-router-dom";
import styles from './Sidebar.module.scss';

export default function Sidebar() {
  return (
    <div className={styles['sidebar']}>
      <div className={styles['logo']}>

      </div>

      <nav className={styles['sidebarnav']}>
        <ul className={styles['sidebarnav__list']}>
          <li className={styles['sidebarnav__item']}>
          <NavLink 
            to='/dashboard'
            >Dashboard</NavLink>
          </li>
          <li>
          <NavLink 
            to='/account'
            >Account</NavLink>
          </li>
          <li>
          <NavLink 
            to='/checkendpoints'
            >Check Endpoints</NavLink>
          </li>

          <li>
            <div></div>
          </li>

          <li>
          <NavLink 
            to='/newtravels'
            >New Travels</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}