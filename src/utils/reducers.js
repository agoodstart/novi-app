/*
    This file will contain all the reducers used throughout the project
*/

export const validationReducer = (_state, action) => {
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