import React from 'react';
import styles from './Typography.module.scss';

export default function Typography({children, variant}) {
  switch(variant) {
    case 'h1':
      return (
        <h1 className={styles['heading-primary']}>
          {children}
        </h1>
      )
    case 'h2':
      return (
        <h2 className={styles['heading-secondary']}>
          {children}
        </h2>
      )
    case 'h3':
      return (
        <h3 className={styles['heading-tertiary']}>
          {children}
        </h3>
      )
    default:
      return (
        "this typography is not supported"
      )
  }
}