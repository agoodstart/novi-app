import styles from './Typography.module.scss';

export default function Typography({children, variant, uppercase, textColor, fontWeight, letterSpacing, customStyles}) {
  const setCustomStyles = () => {
    return {
      textTransform: uppercase ?? null,
      fontWeight: fontWeight ?? null,
      letterSpacing: letterSpacing ?? null,
      color: textColor ?? null,
      ...customStyles,
    }
  }

  switch(variant) {
    case 'h1':
      return (
        <h1 className={styles['typography__heading-primary']} style={setCustomStyles()}>
          {children}
        </h1>
      )
    case 'h2':
      return (
        <h2 className={styles['typography__heading-secondary']} style={setCustomStyles()}>
          {children}
        </h2>
      )
    case 'h3':
      return (
        <h3 className={styles['typography__heading-tertiary']} style={setCustomStyles()}>
          {children}
        </h3>
      )
      case 'h4':
        return (
          <h4 className={styles['typography__heading-quaternary']} style={setCustomStyles()}>
            {children}
          </h4>
        )
    case 'paragraph':
      return (
        <p className={styles['typography__paragraph']} style={setCustomStyles()}>
          {children}
        </p>
      )
    default:
      return (
        "this typography is not supported"
      )
  }
}