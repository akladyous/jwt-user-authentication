export const constrains = {
    password: {
        presence: { message: "^Password is required" },
        length: {
            minimum: 6,
            maximum: 64,
            message: "^Password must be between 6 and 64 characters",
        },
    },
    email: {
        presence: { message: "^Email is required" },
        email: { message: "^Email is invalid" },
    },
};