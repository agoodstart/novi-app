import styles from './Divider.module.scss';
import { useRef, useEffect } from 'react';

export default function Divider({orientation, size, thickness, color, customStyles}) {
  const dividerRef = useRef();

  useEffect(() => {
    dividerRef.current.classList.add(styles['divider']);

    if(orientation) {
      if(!size) {
        console.log('hi');
        dividerRef.current.classList.add(styles[`divider__${orientation}--size-100`])
      } else {
        dividerRef.current.classList.add(styles[`divider__${orientation}--size-${size}`])
      }

      if(!thickness) {
        dividerRef.current.classList.add(styles[`divider__${orientation}--thickness-100`])
      } else {
        dividerRef.current.classList.add(styles[`divider__${orientation}--thickness-${thickness}`])
      }

      if(color) {
        dividerRef.current.classList.add(color);
      }
    }

  }, [])

  return (
    <div ref={dividerRef} style={customStyles} />
  )
}