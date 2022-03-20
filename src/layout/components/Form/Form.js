import React, {useReducer, useEffect, useState, useCallback} from 'react';
import { validationReducer } from '../../../utils/reducers';
import styles from './Form.module.scss';

function Form({children}) {
  const [form, setForm] = useState({})

  const formComponents = [
    TextInput,
    EmailInput,
    NumberInput
  ]

  useEffect(() => {
    console.log(form);
  }, [form])

  return (
    <div className={styles['form__wrapper']}>
      <form className="" onSubmit={e => e.preventDefault()}>
        {React.Children.map(children, (child) => 
          (formComponents.includes(child.type) ? React.cloneElement(child, { setForm }) : child)
        )}
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

export function TextInput({placeholder, name, validations, setForm}) {
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
        type="text"
        id="username"
        name={name}
        onChange={checkValidations} />
    </div>
  )
}

export function EmailInput({placeholder, name, validations, setForm}) {
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
        type="email"
        id="username"
        name={name}
        onChange={checkValidations} />
    </div>
  )
}

export function NumberInput({placeholder, name, validations, setForm}) {
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
          rulreturne: 'noError'
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
        type="number"
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