import styles from './Button.module.scss';

export default function Button({color, variant, size, boxShadow, onClick, customStyles, isDisabled, children}) {

  const setCustomStyles = {
    background: color,
    ...customStyles
  }

  const setClassNames = () => ( 
    `${styles['btn']}` + 
      ' ' + ( variant === 'pill' ? `${styles['btn--pill']}` : variant === 'contained' ? `${styles['btn--contained']}` : `${styles['btn--contained']}` ) +
      ' ' + ( size === 'small' ? `${styles['btn--small']}` : size === 'medium' ? `${styles['btn--medium']}` : size === 'large' ? `${styles['btn--large']}` : `${styles['btn--medium']}`) +
      ' ' + ( boxShadow === 'light' ? `${styles['btn--shadow-light']}` : boxShadow === 'dark' ? `${styles['btn--shadow-dark']}` : `${styles['btn--shadow-light']}`)
  );  

  return (
    <button className={setClassNames()} style={setCustomStyles} onClick={onClick} disabled={isDisabled}>
      {children}
    </button>
  )
}