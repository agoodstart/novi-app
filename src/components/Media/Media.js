import { useEffect, useRef } from "react";

import styles from './Media.module.scss';

export function Video({source, width, coverPage, height, customStyles}) {
  const videoRef = useRef()

  useEffect(() => {
    if(width) {
      videoRef.current.classList.add(styles[`video--width-${width}`]);
    }

    if(height) {
      videoRef.current.classList.add(styles[`video--height-${height}`]);
    }

    if(coverPage) {
      videoRef.current.classList.remove(styles[`video--height-${height}`]);
      videoRef.current.classList.remove(styles[`video--width-${width}`]);

      videoRef.current.classList.add(styles[`coverpage`]);

    }
  }, [])


  return (
    <div ref={videoRef} className={styles['video']} style={customStyles}>
      <video className={styles['video__content']} autoPlay muted loop>
        <source src={source} type="video/mp4" />
        {/* <source src="/assets/citynight.mp4" type="video/mp4" /> */}
        Your browser is not supported!
      </video>
    </div>
  )
}

export function Image({source, alt, width, height, coverPage, customStyles}) {
  const imageRef = useRef();

  useEffect(() => {
    if(width) {
      imageRef.current.classList.add(styles[`image--width-${width}`]);
    }

    if(height) {
      imageRef.current.classList.add(styles[`image--height-${height}`]);
    }

    if(coverPage) {
      imageRef.current.classList.remove(styles[`video--height-${height}`]);
      imageRef.current.classList.remove(styles[`video--width-${width}`]);

      imageRef.current.classList.add(styles[`coverpage`]);

    }
  }, [])


  return (
    <img ref={imageRef} src={source} alt={alt} className={styles['image']} style={customStyles} />
  )
}