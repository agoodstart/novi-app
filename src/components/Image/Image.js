import styles from './Image.module.scss';
import { useEffect, useRef} from 'react';

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
export default function Image({source, alt, width, height, customStyles, ...rest}) {
  const imageRef = useRef();

  useEffect(() => {
    if(width) {
      imageRef.current.classList.add(styles[`image--width-${width}`]);
    }

    if(height) {
      imageRef.current.classList.add(styles[`image--height-${height}`]);
    }
  }, [])


  return (
    <img ref={imageRef} src={source} alt={alt} className={styles['image']} style={customStyles} />
  )
}