import styles from './Center.module.scss';

export default function Center({fixed, children}) {

  const setClassNames = () => {
    let classNameString = styles['center'];

    if(fixed) {
      classNameString = classNameString.concat(' ', styles['fixed'])
    }

    return classNameString;
  }

  return (
    <div className={setClassNames()}>
      {children}
    </div>
  )
}