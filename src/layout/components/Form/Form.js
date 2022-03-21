import React, {useReducer, useEffect, useState, useCallback} from 'react';
import { validationReducer } from '../../../utils/reducers';
import styles from './Form.module.scss';

function Form({children}) {
  const [form, setForm] = useState({})

  const formComponents = [
    TextInput
  ]

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

// const Text = React.memo(({placeholder, name, checkValidations}) => {
//   console.log('renderrr')
//   return (
//     <div className={styles['form__group']}>
//       <input
//         className={styles['form__input']}
//         placeholder={placeholder} 
//         type="text"
//         id="username"
//         name={name}
//         onChange={checkValidations} />
//     </div>
//   )
// })

const Text = React.memo(({placeholder, name, checkValidations}) => {
  console.log('renderrr')
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
})

function HOC(Component) {
  function Wrapper({placeholder, name, validations, setForm}) {
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

    

    return <Component placeholder={placeholder} name={name} checkValidations={checkValidations} />
  }

  return Wrapper;
}

export const TextInput = HOC(Text);

export default Form;