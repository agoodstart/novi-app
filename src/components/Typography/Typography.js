import styles from './Typography.module.scss';
import { useRef, useEffect} from 'react';

export default function Typography({children, variant, uppercase, elevation, textColor, fontWeight, letterSpacing, customStyles}) {
  const typographyRef = useRef();

  useEffect(() => {

    console.log(typographyRef.current.className);

    if(typographyRef.current.tagName.startsWith("H")) {
      const elementSplit = typographyRef.current.tagName.split('')
      typographyRef.current.classList.add(styles[`typography__heading`], styles[`typography__heading-${elementSplit[1]}`])
    } else if(typographyRef.current.tagName.startsWith("P")) {
      typographyRef.current.classList.add(styles[`typography__paragraph`])
    } else if(typographyRef.current.tagName.startsWith("SMALL")) {

      if(typographyRef.current.className === "small") {
        typographyRef.current.classList.add(styles[`typography__small`]);
      } else if(typographyRef.current.className === "xs") {
        typographyRef.current.classList.add(styles[`typography__xs`])
      }
    }

    if(textColor) {
      typographyRef.current.classList.add(textColor);
    }

    if(uppercase) {
      typographyRef.current.classList.add(styles['uppercase']);
    }

    if(elevation) {
      typographyRef.current.classList.add(styles[`elevation-${elevation}`])
    }

    if(fontWeight) {
      typographyRef.current.classList.add(styles[`w${fontWeight}`]);
    }

    if(letterSpacing) {
      typographyRef.current.classList.add(styles[`spacing-${letterSpacing}`]);
    }
  }, [])

  const setCustomStyles = () => {
    return {
      ...customStyles,
    }
  }

  switch(variant) {
    case 'h1':
      return (
        <h1 ref={typographyRef} style={setCustomStyles()}>
          {children}
        </h1>
      )
    case 'h2':
      return (
        <h2 ref={typographyRef} style={setCustomStyles()}>
          {children}
        </h2>
      )
    case 'h3':
      return (
        <h3 ref={typographyRef} style={setCustomStyles()}>
          {children}
        </h3>
      )
    case 'h4':
      return (
        <h4 ref={typographyRef} style={setCustomStyles()}>
          {children}
        </h4>
      )
    case 'h5':
      return (
        <h5 ref={typographyRef} style={setCustomStyles()}>
          {children}
        </h5>
      )
    case 'paragraph':
      return (
        <p ref={typographyRef} style={setCustomStyles()}>
          {children}
        </p>
      )
    case 'small':
      return (
        <small ref={typographyRef} className="small" style={setCustomStyles()}>
          {children}
        </small>
      )
    case 'xs':
      return (
        <small ref={typographyRef} className="xs" style={setCustomStyles()}>
          {children}
        </small>
      )
    default:
      return (
        <p ref={typographyRef} style={setCustomStyles()}>
          {children}
        </p>
      )
  }
}