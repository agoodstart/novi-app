import styles from './Box.module.scss';
import { useRef, useEffect} from 'react';


/**
 * A generic box to contain elements. Best use in conjunction with Container
 */
export default function Box({
  children, 
  flexDirection, 
  justifyContent, 
  alignItems, 
  backgroundColor, 
  elevation, 
  borderRadius, 
  width, 
  height,
  padding
}) {
  const boxRef = useRef();

  useEffect(() => {
    if(flexDirection) {
      if(flexDirection === "row") {
        boxRef.current.classList.add(styles['box__flex--row']);
      } else if (flexDirection === "column") {
        boxRef.current.classList.add(styles['box__flex--column']);
      }

      if(justifyContent) {
        boxRef.current.classList.add(styles[`box__flex--justify-${justifyContent}`]);
      }

      if(alignItems) {
        boxRef.current.classList.add(styles[`box__flex--align-${alignItems}`]);
      }
    }

    if(backgroundColor) {
      boxRef.current.classList.add(backgroundColor)
    }

    if(elevation) {
      boxRef.current.classList.add(styles[`elevation-${elevation}`]);
    }

    if(borderRadius) {
      boxRef.current.classList.add(styles[`box--border-radius-${borderRadius}`]);
    }

    if(width) {
      boxRef.current.classList.add(styles[`box--width-${width}`]);
    }

    if(height) {
      boxRef.current.classList.add(styles[`box--height-${height}`]);
    }

    if(padding) {
      boxRef.current.classList.add(styles[`box--padding-${padding}`]);
    }
  }, []);

  return (
    <div className={styles['box']} ref={boxRef}>
      {children}
    </div>
  )
}