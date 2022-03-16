/*
This file will contain all the helper functions
*/

export const validateEmail = (emailString) => {
    const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return emailString.match(validEmailRegex);
}