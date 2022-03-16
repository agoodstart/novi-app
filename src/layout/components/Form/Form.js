import React, {useReducer} from 'react';
import { validationReducer } from '../../../utils/reducers';

import styles from './Form.module.scss';

/**
 * creates and returns object representation of form field
 *
 * @param {string} label - label to show with the form input
 * @param {string} name - input name
 * @param {string} type - input type
 * @param {string} defaultValue - default value for the input
 */
function Form({children}) {

  return (
    <div className={styles['form__wrapper']}>
      <form className="" onSubmit={e => e.preventDefault()}>
        {children}
      </form>
    </div>
  )
}

export function Input({placeholder, type, name, validators}) {
  const initialState = {
    inputName: '',
    inputValue: '',
  }

  const validateRequired = () => {
    
  }

  const [state, dispatch] = useReducer(validationReducer, initialState);

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

export default Form;