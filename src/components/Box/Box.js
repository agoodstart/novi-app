import styles from './Box.module.scss';

/**
 * A generic box to contain elements. Best use in conjunction with Container
 */
export default function Box({children, backgroundColor, borderRadius}) {
  return (
    <div>
      {children}
    </div>
  )
}