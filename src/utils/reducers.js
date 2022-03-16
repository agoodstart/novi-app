/*
    This file will contain all the reducers used throughout the project
*/

export const validationReducer = (state, action) => {
    switch(action.type) {
        case 'required':
            return {
                errorMessage: `${state.name} required`,
                validator: action.func
            }
        case 'minLength':
            return {
                errorMessage: `${state.name} should at least contain 6 characters`,
                validator: action.func
            }
        case 'passwordMatch':
            return {
                errorMessage: `Passwords do not match`,
                validator: action.func
            }
        default:
            throw new Error('');
    }
}

export const registerReducer = (state, action) => {
    switch(action.type) {
        case 'setUsername':
          return {
            ...state,
            username: action.payload
          };
        case 'setPassword':
          return {
            ...state,
            password: action.payload
          };
        case 'setPasswordConfirm':
          return {
            ...state,
            passwordConfirm: action.payload
          }
        case 'passwordMismatch':
          return {
            ...state,
            passwordMismatch: action.payload,
          };
        case 'setEmail':
          return {
            ...state,
            email: action.payload
          }
        case 'emailInvalid':
          return {
            ...state,
            emailInvalid: action.payload
          }
        case 'setIsButtonDisabled':
          return {
            ...state,
            isButtonDisabled: action.payload
          }
        case 'registrationFailed':
          return {
            ...state,
            helperText: action.payload,
            isError: true
          };
        case 'setIsError':
          return {
            ...state,
            isError: action.payload
          };
    }
}

export const loginReducer = (state, action) => {
    switch (action.type) {
        case 'setUsername':
            return {
                ...state,
                username: action.payload
            };
        case 'setPassword':
            return {
                ...state,
                password: action.payload
            }
        case 'setIsButtonDisabled':
            return {
                ...state,
                isButtonDisabled: action.payload
            }
        case 'loginSuccess':
            return {
                ...state,
                helperText: action.payload,
                isError: false
            };
        case 'loginFailed':
            return {
                ...state,
                helperText: action.payload,
                isError: true
            };
        case 'setIsError':
            return {
                ...state,
                isError: action.payload
            };
    }
}