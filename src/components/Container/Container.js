import { useRef, useEffect } from "react"
import styles from './Container.module.scss';

/**
 * A generic container with preset values
 */
 export default function Container({children, element, backgroundColor, id, customStyles}) {
  const containerRef = useRef();

  useEffect(() => {
    containerRef.current.classList.add(styles['container']);

    if(backgroundColor) {
      containerRef.current.classList.add(backgroundColor);
    }

    if(id) {
      containerRef.current.id = id;
    }
  }, [])

  switch (element) {
    case 'main':
      return (
        <main ref={containerRef} style={customStyles}>
          {children}
        </main>
      )
    case 'section':
      return (
        <section ref={containerRef} style={customStyles}>
          {children}
        </section>
      )
    case 'div':
      return (
        <div ref={containerRef} style={customStyles}>
          {children}
        </div>
      )
    default:
      return (
        <div ref={containerRef}>
          {children}
        </div>
      )
  }
}