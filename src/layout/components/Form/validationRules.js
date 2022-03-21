class Validate {
    isRequired() {
        return {
            name: 'required',
            validate: (field) => {
                return !!field.value;
            }
        }
    }

    minLength(length) {
        return {
            name: 'minLength',
            validate: (field) => {
                field.length = length;
                return field.value.length >= length
            }
        }
    }

    maxLength(length) {
        return {
            name: 'maxLength',
            validate: (field) => {
                field.length = length;
                return field.value.length <= length
            }
        }
    }

    isEmail() {
        return {
            name: 'isEmail',
            validate: (field) => {
                return field.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
            }
        }
    }

    passwordMatch(matchingInput) {
        return {
            name: 'passwordMatch',
            validate: (field) => {
                const firstPassword = document.getElementById(matchingInput);
                return firstPassword.value === field.value;
            }
        }
    }   
}

export default new Validate();