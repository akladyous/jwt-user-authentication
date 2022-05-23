import { useEffect, useCallback } from "react";
import {
    userState,
    resetUser,
    setUser,
    setUserState,
} from "../features/users/userSlice.js";
import { useSelector, useDispatch } from "react-redux";

export default function UserState () {
    const {token} = useSelector(userState);
    const dispatch = useDispatch();

    const getPayload = useCallback( (token) => {
        const encodedPayload = token.split(".")[1];
        try {
            const decodedToken = JSON.parse(window.atob(encodedPayload))
            if (decodedToken.hasOwnProperty('exp')){
                if(Date.now() <= decodedToken.exp * 1000)
                return decodedToken.payload
            }
        } catch (err){
            console.log(err)
            return false
        }
    },[])

    useEffect(()=>{
        console.log('component did mount')
        if (!token){
            dispatch(resetUser())
        } else {
            const decodedToken = getPayload(token)
            dispatch(setUser(decodedToken));
            dispatch(setUserState(true));
        }

        return ()=> {console.log('component will unmount')}
    },[token])
};