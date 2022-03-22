import React, {useReducer, useEffect, useState, useMemo, useRef} from 'react';
import { validationReducer } from '../../../utils/reducers';
import styles from './Form.module.scss';

const Form = ({children}) => {
  /* 
  the validationstate of the form depends on its children so we need to reference their states
  but useRef does not cause a rerender, so I use a simple usestate hook to force a rerender.
  */
  let formRef = useRef({});
  const [update, toggleForceUpdate] = useState(true)

  const updateComponentState = (name, isValid) => {
    formRef.current = {...formRef.current, [name]: isValid}
    toggleForceUpdate(!update);
  }

  // useMemo will cache the variable. useMemo will only run when the dependency changes
  const isFormInvalid = useMemo(() => {
    for (const property in formRef.current) {
      if (!formRef.current[property]) return false
    }

    return true;
  }, [update])

  const formComponents = [
    TextInput
  ]

  const formSubmission = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    console.log(formProps);
  }

  return (
    <div className={styles['form__wrapper']}>
      <form className="" onSubmit={formSubmission}>
        {React.Children.map(children, (child) => 
          (formComponents.includes(child.type) ? React.cloneElement(child, { updateComponentState }) : child)
        )}

      <input 
        type="submit"
        disabled={!isFormInvalid}
        />
      </form>
    </div>
  )
}

function HOC(FormComponent) {
  function Wrapper({placeholder, name, validations, type, ...rest}) {
    const initialState = {
      errorMessage: '',
      isValid: false
    }

    const [state, dispatch] = useReducer(validationReducer, initialState);
  
    useEffect(() => {
      rest.updateComponentState(name, state.isValid)
    }, [state.isValid])
  
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