import { useSelector, useDispatch } from "react-redux";
import { useGetUsersQuery, useLazyGetUsersQuery, useSetUsersMutation } from '../app/api/testApiSlice.js'

import { tokenState } from "../features/token/tokenSlice.js";
import { testAction } from "../app/thunkAPI/test/testAction.js";

export default function Test() {
    const {token} = useSelector(tokenState)
    const dispatch = useDispatch();
    
    // let [setUsers, {isError, isLoading}] = useSetUsersMutation()
    // let {data, error} =  useGetUsersQuery()
    const [getusers, result, lastPromiseInfo] = useLazyGetUsersQuery()
    
    // let [getUsers, {isLoading, isError, error}] = useGetUsersQuery()

    // console.log('test component error : ', error)
    // console.log('test component data : ', data)

    const handleTest = async () =>{
        // dispatch(testAction());

        getusers()
        console.log('result : ', result)
        console.log('lastPromiseInfo : ', lastPromiseInfo)
    };

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
