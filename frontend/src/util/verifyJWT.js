export function verifyJWT(token) {
    try {
        const encodedPayload = token.split(".")[1];
        const decoded = JSON.parse(window.atob(encodedPayload))
        if (decoded.hasOwnProperty('exp')) {
            if ((new Date().getTime() + 10) < decoded.exp * 1000) {
                return decoded;
            } else {
                return null;
            }

        }
    } catch (err) {
        return null;
    }
};

