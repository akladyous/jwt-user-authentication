import { auth } from './firebaseInit.js'

export const getCurrentUser = () => {
    const user = auth.currentUser;
    console.log('get current user : ', user)
    if (!user) return null;

    return {
        id: user.uid,
    }
}