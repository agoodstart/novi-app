import React, {useReducer, useEffect, useState, useRef, Children} from 'react';
import styles from './Form.module.scss';

export const TextInput = ({placeholder, name, onChange, iRef, size, padding, customStyles, readonly}) => {
  const defRef = useRef(null);
  
  const createRefs = (element) => {
    defRef.current = element
    
    if(iRef) iRef.current = element
  }
  
  useEffect(() => {
    defRef.current.classList.add(styles['form__input-text'])

    if(size) {
      defRef.current.classList.add(styles[`form__input-text--size-${size}`])
    }
  }, []);

  return (
      <input
        style={customStyles}
        className={styles['form__input']}
        placeholder={placeholder} 
        type="text"
        id={name}
        name={name}
        onChange={onChange}
        ref={createRefs}
        readOnly={readonly} />
  )
};

export const EmailInput = ({placeholder, name, onChange, iRef, size, padding, customStyles, readOnly}) => {
  const defRef = useRef(null);
  
  const createRefs = (element) => {
    defRef.current = element
    
    if(iRef) iRef.current = element
  }
  
  useEffect(() => {
    defRef.current.classList.add(styles['form__input-text'])

    if(size) {
      defRef.current.classList.add(styles[`form__input-text--size-${size}`])
    }
  }, []);


  return (
      <input
        style={customStyles}
        className={styles['form__input']}
        placeholder={placeholder} 
        type="email"
        id={name}
        name={name}
        onChange={onChange}
        ref={createRefs}
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

export const TextArea = ({placeholder, name, onChange, iRef, rows, cols, textSize, padding, customStyles, readOnly}) => {
  const defRef = useRef(null);
  
  const createRefs = (element) => {
    defRef.current = element
    
    if(iRef) iRef.current = element
  }
  
  useEffect(() => {
    defRef.current.classList.add(styles['form__input-text'])

    if(textSize) {
      defRef.current.classList.add(styles[`form__input-text--size-${textSize}`])
    }
  }, []);

  return (
    <textarea
      style={customStyles}
      className={styles['form__input']}
      placeholder={placeholder} 
      rows={rows}
      cols={cols}
      id={name}
      name={name}
      onChange={onChange}
      ref={createRefs}
      readOnly={readOnly} />
  )
}

const formComponents = [
  TextInput,
  EmailInput,
  NumberInput,
  PasswordInput,
  ImageInput,
  TextArea
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

const Form = ({children, onSubmit, onValidate, customStyles, flex}) => {
  const formRef = useRef();
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
    if(flex) {
      formRef.current.classList.add(styles[`form__flex`])
    }
  }, [])

  useEffect(() => {
    if(onValidate) {
      onValidate(formElementsValid.every(el => el))
    }
  }, [formElementsValid])

  // const formSubmission = (e) => {
  //   e.preventDefault();
  //   console.log(e.target.elements);
  //   const formData = new FormData(e.target);
  //   console.log(Array(formData.entries()));
  //   const formProps = Object.fromEntries(formData);

  //   onSubmit(formProps)
  // }

  const formSubmission = (e) => {
    e.preventDefault();
    let elements = e.target.elements;
    let formProps = {};

    for(let i = 0 ; i < elements.length - 1; i++){
      let item = elements.item(i);
      formProps[item.name] = item.value;
    }

    console.log(formProps);
    onSubmit(formProps)
  }


  return (
    <div className={styles['form__wrapper']} style={customStyles}>
      <form ref={formRef} className="" onSubmit={formSubmission}>
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