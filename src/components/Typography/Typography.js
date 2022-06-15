import styles from './Typography.module.scss';

export default function Typography({children, variant}) {
  switch(variant) {
    case 'h1':
      return (
        <h1 className={styles['typographyheading-primary']}>
          {children}
        </h1>
      )
    case 'h2':
      return (
        <h2 className={styles['typography__heading-secondary']}>
          {children}
        </h2>
      )
    case 'h3':
      return (
        <h3 className={styles['typography__heading-tertiary']}>
          {children}
        </h3>
      )
    case 'paragraph':
      return (
        <p className={styles['typography__paragraph']}>
          {children}
        </p>
      )
    default:
      return (
        "this typography is not supported"
      )
  }
}