import styles from './Button.module.scss';
import { useRef, useEffect } from 'react';
import useTheme from '../../hooks/useTheme';

export default function Button({textColor, color, size, pill, fullWidth, elevation, onClick, customStyles, isDisabled, type, children}) {
  const { colors } = useTheme();

  const buttonRef = useRef();

  useEffect(() => {
    if(isDisabled && isDisabled instanceof Function) {
      isDisabled(buttonRef.current)
    }

    if(buttonRef.current.disabled) {
      buttonRef.current.classList.remove(color);
      buttonRef.current.classList.add(colors.background.secondary.alpha['50']);
    } else {
      buttonRef.current.classList.remove(colors.background.secondary.alpha['50']);
      buttonRef.current.classList.add(color);
    }
  })
  
  useEffect(() => {

    if(size) {
      buttonRef.current.classList.add(styles[`btn--${size}`]);
    } else {
      buttonRef.current.classList.add(styles[`btn--medium`]);
    }

    if(elevation) {
      buttonRef.current.classList.add(styles[`elevation-${elevation}`])
    }

    if(pill) {
      buttonRef.current.classList.add(styles['btn--pill'])
    }

        
    if(fullWidth) {
      buttonRef.current.classList.add(styles['btn--w100'])
    }

    if(textColor) {
      if(textColor === 'black') {
        buttonRef.current.classList.add(styles['btn--text-black'])
      } else if(textColor === 'white') {
        buttonRef.current.classList.add(styles['btn--text-white'])
      }
    } else {
      buttonRef.current.classList.add(styles['btn--text-white'])
    }
    // console.log(isDisabled);
  }, [])

  return (
    <button ref={buttonRef} type={type} style={customStyles} onClick={onClick}>
      {children}
    </button>
  )
}