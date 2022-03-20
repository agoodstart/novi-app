import React, {useReducer, useEffect, useState, useCallback} from 'react';
import { validationReducer } from '../../../utils/reducers';
import styles from './Form.module.scss';

function Form({children}) {
  const [form, setForm] = useState({})

  useEffect(() => {
    console.log(form);
  }, [form])

  return (
    <div className={styles['form__wrapper']}>
      <form className="" onSubmit={e => e.preventDefault()}>
        {React.Children.map(children, (child) => {
          console.log(child.type === Input);
          return React.cloneElement(child, { setForm })
        })}
      </form>
    </div>
  )
}

function FormComponent({children}) {
  return (
    <div className={styles['form__group']}>
      {children}
    </div>
  )
}

export function Input({placeholder, type, name, validations, setForm}) {
  const initialState = {
    errorMessage: '',
    isValid: true
  }

  const [state, dispatch] = useReducer(validationReducer, initialState);

  useEffect(() => {
    console.log('State has changed');
  }, [state.isValid])
  

  const isInputFieldValid = useCallback(
    (obj) => {
      for (const validation of obj.validations) {
        if(!validation.validate(obj.field)) {
          dispatch({
            rule: validation.name,
            payload: obj.field
          });
          return false;
        }
      }

      return true;
    }, [dispatch]
  )

  const checkValidations = useCallback(
    (e) => {
      const validObj = {
        field: {
          name: e.target.name,
          value: e.target.value
        },
        validations
      }

      const isValidInput = isInputFieldValid(validObj)

      if(isValidInput) {
        dispatch({
          rule: 'noError'
        })
      }

      setForm({
        name,
        isValid: state.isValid
      })
    }, [state.isValid]
  ) 

  return (
    <div className={styles['form__group']}>
      <input
        className={styles['form__input']}
        placeholder={placeholder} 
        type={type}
        id="username"
        name={name}
        onChange={checkValidations} />
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