const validateInput = useCallback((e) => {
    let target = e.target;
    let validationErrors = {};

    if (target.tagName.toLowerCase() === 'form') {
        validationErrors = validate(e.target, constrains)
    } else {
        if (target.value.toString().length > 0) {

            let errors = validate.single(target.value, constrains[target.name], { format: 'detailed' })
            if (errors) {
                validationErrors[target.name] = errors
            } else {
                validFeedback.call(target)
                return null
            }
        } else {
            removeFeedback.call(target)
            return null
        }
    }
    invalidFeedback(validationErrors)
    return true

}, []);