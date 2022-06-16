export function validFeedback() {
    this.className = "form-control is-valid";
    this.nextElementSibling.classList.add('valid-feedback')
    this.nextElementSibling.textContent = '';
}

export function invalidFeedback(errors) {
    for (let targetName in errors) {
        let target = document.querySelector(`[name=${targetName}]`)
        let feedback = target.nextElementSibling
        feedback.classList.add("invalid-feedback");
        feedback.textContent = errors[targetName].join('\r\n');
        feedback.style.display = "block";
        target.classList = "form-control is-invalid";
    }
}

export function removeFeedback() {
    this.classList.remove('is-valid', 'is-invalid')
    this.nextElementSibling.classList = ''
    this.nextElementSibling.textContent = ''
}

export const constrains = {
    password: {
        presence: { message: "^Password is required" },
        length: {
            minimum: 6,
            maximum: 64,
            message: "^Password must be between 6 and 64 characters",
        },
    },
    passwordConfirmation: {
        presence: { message: "^Password is required" },
        length: {
            minimum: 6,
            maximum: 64,
            message: "^Confirmation Password must be between 6 and 64 characters",
        },
        equality: {
            attribute: 'password',
            message: "^Confirmation Password is not equal to password",
            comparator: function (v1, v2) {
                if (!v2) v2 = document.querySelector("[name='password']").value
                return v1 === v2
            }
        }
    },
    email: {
        presence: { message: "^Email is required" },
        email: { message: "^Email is invalid" },
    },
};