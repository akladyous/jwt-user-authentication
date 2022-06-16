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
            message: "^Password must be between 6 and 64 characters",
        },
        equality: {
            attribute: 'password',
            message: 'password dont match',
            comparator: function(v1, v2){
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