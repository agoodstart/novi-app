import React, {useReducer, useEffect, useState, useCallback, useMemo} from 'react';
import { validationReducer } from '../../../utils/reducers';
import styles from './Form.module.scss';

function Form({children}) {
  const [form, setForm] = useState({})

  // The setFormCallback function only causes component rerendering,
  // when the setForm function changes 
  const setFormCallback = useCallback((obj) => {
    setForm({
      obj
    })
  }, [setForm])

  const isFormValid = useMemo(() => {
    for (const component in form) {
      if (!component.isValid) return false
    }

    return true;
  }, [form])

  console.log(isFormValid)

  useEffect(() => {
    console.log(form)
  }, [form])

  const formComponents = [
    TextInput
  ]

  return (
    <div className={styles['form__wrapper']}>
      <form className="" onSubmit={e => e.preventDefault()}>
        {React.Children.map(children, (child) => 
          (formComponents.includes(child.type) ? React.cloneElement(child, { setFormCallback }) : child)
        )}

      <input 
        type="submit"
        disabled={isFormValid}
        />
      </form>
    </div>
  )
}

function HOC(FormComponent) {
  function Wrapper({placeholder, name, validations, type, ...rem}) {
    const initialState = {
      errorMessage: '',
      isValid: true
    }

    const [state, dispatch] = useReducer(validationReducer, initialState);
  
    useEffect(() => {
      rem.setFormCallback({
        name,
        isValid: state.isValid
      })
    }, [state.isValid, name, rem.setFormCallback])
    
  
    const isInputFieldValid = (obj) => {
      if (!obj.validations) return true;

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
    }
  
    const checkValidations = (e) => {
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
    }

    return (
      <div className={styles['form__group']}>
        <FormComponent placeholder={placeholder} name={name} type={type} checkValidations={checkValidations} />
        {state.errorMessage && !state.isValid && (
          <span className="error">{state.errorMessage}</span>
        )}
      </div>
    )
  }

  return Wrapper;
}

export const TextInput = HOC(React.memo(({placeholder, name, checkValidations, type}) => {
  return (
      <input
        className={styles['form__input']}
        placeholder={placeholder} 
        type={type}
        id={name}
        name={name}
        onChange={checkValidations} />
  )
}));

export default Form;