class Validate {
    validationRule(ruleName, errorMessage, validateFunc) {
        return {
            name: ruleName,
            message: errorMessage,
            validate: validateFunc,
        }
    }

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
                return field.value.length >= length
            }
        }
    }

    maxLength(length) {

    }
}

export default new Validate();