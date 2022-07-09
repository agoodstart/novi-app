import { useRef, useEffect } from 'react';
import styles from './Flexbox.module.scss';
 
export default function Flexbox({direction, }) {
  const flexboxRef = useRef();

  useEffect(() => {
    
  }, []);

  return (
    <div className={styles['flexbox']} ref={flexboxRef}>
      
    </div>
  )
}