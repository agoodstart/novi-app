import styles from './Typography.module.scss';

export default function Typography({children, variant, uppercase, textShadow, textColor, fontWeight, letterSpacing, customStyles}) {
  const setCustomStyles = () => {
    return {
      color: textColor ?? null,
      ...customStyles,
    }
  }

  const setClassNames = (type, number) => {
    let classNameString = "";

    if(type === 'heading') {
      classNameString = classNameString.concat(' ', styles[`typography__heading`], ' ', styles[`typography__heading-${number}`])
    } else if(type === 'paragraph') {
      classNameString.concat(' ', styles[`typography_paragraph`])
    } else if (type === 'small') {
      classNameString.concat(' ', styles['typography__small'])
    }

    if(uppercase) {
      classNameString = classNameString.concat(' ', styles['uppercase'])
    }

    if(fontWeight) {
      classNameString = classNameString.concat(' ', styles[`w${fontWeight}`])
    }                                                                                       

    if(letterSpacing) {
      classNameString = classNameString.concat(' ', styles[`spacing-${letterSpacing}`])
    }

    if(textShadow) {
      classNameString = classNameString.concat(' ', styles['shadow'])
    }

    return classNameString;
  }

  switch(variant) {
    case 'h1':
      return (
        <h1 className={setClassNames('heading', 1)} style={setCustomStyles()}>
          {children}
        </h1>
      )
    case 'h2':
      return (
        <h2 className={setClassNames('heading', 2)} style={setCustomStyles()}>
          {children}
        </h2>
      )
    case 'h3':
      return (
        <h3 className={setClassNames('heading', 3)} style={setCustomStyles()}>
          {children}
        </h3>
      )
    case 'h4':
      return (
        <h4 className={setClassNames('heading', 4)} style={setCustomStyles()}>
          {children}
        </h4>
      )
    case 'h5':
      return (
        <h4 className={setClassNames('heading', 5)} style={setCustomStyles()}>
          {children}
        </h4>
      )
    case 'paragraph':
      return (
        <p className={setClassNames('paragraph')} style={setCustomStyles()}>
          {children}
        </p>
      )
    case 'small':
      return (
        <small className={setClassNames('small')} style={setCustomStyles()}>
          {children}
        </small>
      )
    default:
      return (
        <p className={setClassNames('paragraph')} style={setCustomStyles()}>
          {children}
        </p>
      )
  }
}