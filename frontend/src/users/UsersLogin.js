import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userState } from "../features/users/userSlice.js";
import { useLoginMutation } from "../app/api/authApiSlice.js";
import { verifyJWT } from "../util/verifyJWT.js";
import { setUser, setUserState } from "../features/users/userSlice.js";
import { _objectWithoutPropertiesLoose } from '../util/babel'

export default function UsersLogin() {
    const dispatch = useDispatch();
    const state = useSelector(userState);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    
    let [ login,{ isLoading, isFetching, isError, } ] = useLoginMutation();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState('')

    const handleForm = async (e) => {
        e.preventDefault();

        try {
            const accessToken = await login({ email, password }).unwrap();
            const userData = verifyJWT(accessToken);
            dispatch(setUser(_objectWithoutPropertiesLoose(userData, ['iat', 'exp'])));
            dispatch(setUserState(true));
            setEmail('')
            setPassword('')

        } catch (err) {
            dispatch(setUserState(false));
            if (err?.status === "FETCH_ERROR") {
                setErrorMsg("internal server error")
            } else {
                setErrorMsg(err.data.error.message)
            }
        }
    };

    useEffect(() => {
        let isMounted = true;
        if (state.isAuthenticated && isMounted === true) {
            navigate(from, { replace: true });
        }

        return () => {
            isMounted = false;
        };
    }, [state.isAuthenticated]);

    return (
        <div className="container my-3">
            <div className="row justify-content-md-center">
                <div className="col col-lg-5 col-md-5 col-sm-5">
                    <div className="card">
                        <div className="card-header text-center">
                            SignIn Page
                        </div>
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <img
                                    src={require("../assets/images/avatar.jpeg")}
                                    className="card-img-top mx-auto"
                                    alt="avatar"
                                    style={{ width: "25%", height: "25%" }}
                                />
                            </div>
                            <form onSubmit={handleForm}>
                                <div className="mb-2">
                                    <label
                                        htmlFor="email"
                                        className="form-label"
                                    >
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder=""
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        placeholder=""
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                    />
                                </div>
                                <div className="mb-2">
                                    <p
                                        disabled
                                        className="text-center border-0 form-control"
                                        aria-describedby="response"
                                    >
                                        { isError && errorMsg }
                                    </p>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col col-auto">
                                        <button
                                            type="submit"
                                            className="btn btn-light"
                                            disabled={state.isAuthenticated}
                                        >
                                            Submit
                                        </button>
                                        <p>{isLoading || isFetching ? "loading..." : ""}</p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
