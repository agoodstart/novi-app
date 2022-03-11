import React from 'react';
import * as PropTypes from 'prop-types'

import styles from './Form.module.scss';

function Form(props) {
  return (
    <form className="" onSubmit={e => e.preventDefault()}>
      {props.children}
    </form>
  )
}

export function Input({placeholder, type, name}) {
  return (
    <div className={styles['form__group']}>
      <input
        className={styles['form__input']}
        placeholder={placeholder} 
        type={type}
        id="username"
        name={name}
        onChange={e => console.log(e.target.value)} />
    </div>
  )
}

export function Checkbox() {
  return (
    <div className={styles['form__group']}>
      
    </div>
  )
}

export function Select() {
  return (
    <div className={styles['form__group']}>
      
    </div>
  )
}

Form.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.instanceOf(Input),
    PropTypes.instanceOf(Checkbox),
    PropTypes.instanceOf(Select),
  ])
};

export default Form;