import styles from './Divider.module.scss';

export default function Divider({length, thickness, radius, orientation, color, customStyles}) {

  const setClassNames = () => ( 
    `${styles['divider']}`
  );  

  return (
    <div className={styles['divider']}></div>
  )
}