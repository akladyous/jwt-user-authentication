export const loadTokenFromLocalStorage = () => {
    try {
        const token = localStorage.getItem('token')
        if (token === null || token === 'null' || token === 'undefined' || token === '' ) {
            localStorage.removeItem('token')
            return undefined;
        }
        return token;
    } catch (err) {
        return undefined;
    }
};

export const saveTokenInLocalStorage = (token) => {
    try {
        localStorage.setItem('token', token) ;
    } catch (err) {
        // ignore writing errors;
    }
}