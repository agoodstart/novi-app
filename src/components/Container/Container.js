import { useRef, useEffect } from "react"
import styles from './Container.module.scss';

/**
 * A generic container with preset values
 */
 export default function Container({children, element}) {
  const containerRef = useRef();

  useEffect(() => {
    containerRef.current.classList.add(styles['container'])
  }, [])

  switch (element) {
    case 'main':
      return (
        <main ref={containerRef}>
          {children}
        </main>
      )
    case 'section':
      return (
        <section ref={containerRef}>
          {children}
        </section>
      )
    case 'div':
      return (
        <div ref={containerRef}>
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