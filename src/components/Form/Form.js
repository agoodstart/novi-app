import React, {useReducer, useEffect, useState, Children} from 'react';
import styles from './Form.module.scss';

export const TextInput = ({placeholder, name, onChange, iRef, customStyles, readonly}) => {
  return (
      <input
        style={customStyles}
        className={styles['form__input']}
        placeholder={placeholder} 
        type="text"
        id={name}
        name={name}
        onChange={onChange}
        ref={iRef}
        readOnly={readonly} />
  )
};

export const EmailInput = ({placeholder, name, onChange, iRef, customStyles, readOnly}) => {
  return (
      <input
        style={customStyles}
        className={styles['form__input']}
        placeholder={placeholder} 
        type="email"
        id={name}
        name={name}
        onChange={onChange}
        ref={iRef}
        readOnly={readOnly} />
  )
};

export const ImageInput = ({placeholder, name, onChange, iRef}) => {
  return (
    <input
      className={styles['form__input']}
      placeholder={placeholder} 
      type="file"
      accept="image/png, image/jpeg"
      id={name}
      name={name}
      ref={iRef}
      onChange={onChange} />
  )
};

export const PasswordInput = ({placeholder, name, onChange, iRef, customStyles, readOnly}) => {
  return (
      <input
        style={customStyles}
        className={styles['form__input']}
        placeholder={placeholder} 
        type="password"
        id={name}
        name={name}
        onChange={onChange}
        ref={iRef}
        readOnly={readOnly} />
  )
};

export const NumberInput = ({placeholder, name, onChange, iRef, value, customStyles, readOnly}) => {
  return (
      <input
        style={customStyles}
        inputMode="numeric"
        className={styles['form__input']}
        placeholder={placeholder} 
        type="text"
        id={name}
        name={name}
        onChange={onChange}
        ref={iRef}
        value={value}
        readOnly={readOnly} />
  )
};

const formComponents = [
  TextInput,
  EmailInput,
  NumberInput,
  PasswordInput,
  ImageInput
]

const validationReducer = (_state, action) => {
  switch(action.rule) {
    case 'required':
      return {
        errorMessage: `${action.payload.name} required`,
        isValid: false,
      }
    case 'minLength':
      return {
        errorMessage: `${action.payload.name} should at least contain ${action.payload.length} characters`,
        isValid: false,
      }
    case 'isEmail':
      return {
        errorMessage: `${action.payload.name} is not a valid email`,
        isValid: false,
      }
    case 'passwordMatch':
      return {
        errorMessage: `Passwords do not match`,
        isValid: false,
      }
    case 'noError':
      return {
        errorMessage: '',
        isValid: true
      }
    default:
      throw new Error('This action does not exist');
  }
}

const Form = ({children, onSubmit, onValidate, customStyles}) => {
  let realIndex = 0;
  const [formElementsValid, setFormElementsValid] = useState(Array.from(children, (child, i) => child.type === FormControl ? false : null).filter(el => el !== null));

  const changeFormElementStatus = (isValid, index) => {
    setFormElementsValid(formElementsValid.map((el, i) => {
      if(i === index) {
        el = isValid
      }

      return el;
    }));
  }

  useEffect(() => {
    if(onValidate) {
      onValidate(formElementsValid.every(el => el))
    }
  }, [formElementsValid])

  const formSubmission = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    onSubmit(formProps)
  }

  return (
    <div className={styles['form__wrapper']} style={customStyles}>
      <form className="" onSubmit={formSubmission}>
        {Children.map(children, (child) => {
          if(child.type === FormControl) {
            return React.cloneElement(child, { index: realIndex++, changeFormElementStatus })
          }

          return child;
        })}
      </form>
    </div>
  )
}

export const FormControl = ({children, validations, ...rest}) => {
  const initialState = {
    errorMessage: '',
    isValid: false
  }

  const [state, dispatch] = useReducer(validationReducer, initialState);

  useEffect(() => {
    rest.changeFormElementStatus(state.isValid, rest.index)
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
      {Children.map(children, (child) => 
        formComponents.includes(child.type) ? React.cloneElement(child, { onChange: checkValidations }) : null
      )}
      {state.errorMessage && !state.isValid && (
        <span className={styles['form__input--error']}>{state.errorMessage}</span>
      )}
    </div>
  )
}

export default Form;