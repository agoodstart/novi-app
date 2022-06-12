import styles from './List.module.scss';

export function List({children, customStyles}) {

  return (
    <ul style={customStyles} className={styles['list']}>
      {children}
    </ul>
  )
}

export function ListItem({children}) {

  return (
    <li className={styles['list__item']}>
      {children}
    </li>
  )
}