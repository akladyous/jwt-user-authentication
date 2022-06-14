// import { userState } from "../features/users/userSlice.js";
// import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { tokenState } from "../features/token/tokenSlice.js";
import { useGetUsersQuery } from '../features/testApiSlice.js'
import { testAction } from "../app/thunkAPI/test/testAction.js";

export default function Test() {
    const {token} = useSelector(tokenState)
    const dispatch = useDispatch();
    

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetUsersQuery({ Headers: { Authorization: `Bearer ${token}` } });

    console.log('test component error : ', error)
    console.log('test component data : ', users)
    const handleTest = async () =>{
        dispatch(testAction());
    };

    // useEffect(() => {
    //     let isMounted = true;

    //     return () => {
    //         isMounted = false;
    //     };
    // }, []);

    return (
        <div className="container">
            <h1>Test page</h1>

            <br />
            <div>
                <button onClick={handleTest}>test route</button>
                <p className="text-break">{token}</p>
            </div>
            <br />
            <div className="container">
                {/* <button onClick={accessToken}>accessToken</button> */}
                {/* <p className="text-break">{token}</p> */}
            </div>
        </div>
    );
}
