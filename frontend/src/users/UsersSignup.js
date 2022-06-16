import React, { useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userState } from "../features/users/userSlice.js";
import { useSignupMutation } from "../app/api/authApiSlice.js";
import { setToken } from "../features/token/tokenSlice.js";
import { verifyJWT } from "../util/verifyJWT.js";
import { setUser, setUserState } from "../features/users/userSlice.js";
import { _objectWithoutPropertiesLoose } from "../util/babel";
import validate from "validate.js";
import { constrains, validFeedback, invalidFeedback, removeFeedback } from "../util/validation";

export default function UsersSignup() {
    const state = useSelector(userState);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [message, setMessage] = useState('')
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        passwordConfirmation: "",
    });

    const [signup, { isLoading, isFetching }] = useSignupMutation();

    const handleChange = useCallback((e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }, []);

    const handleForm = useCallback(async (e) => {
        e.preventDefault();
        const formValidation = validateInput(e)
        if (formValidation) return
        try {
            const accessToken = await signup({ email: formData.email, password: formData.password}).unwrap();
            const userData = verifyJWT(accessToken);
            dispatch(
                setUser(_objectWithoutPropertiesLoose(userData, ["iat", "exp"]))
            );
            dispatch(setUserState(true));
            dispatch(setToken(accessToken));
            setFormData({ email: "", password: "", passwordConfirmation: "" });
            setMessage('Login successfully completed')
            setTimeout(() => {
                navigate(from, { replace: true });
            }, 1500)
        } catch (err) {
            dispatch(setUserState(false));
            if (err?.status === "FETCH_ERROR") {
                setMessage("internal server error");
            } else {
                setMessage(err.data.error.message);
            }
        }
    }, [formData]);

    const validateInput = useCallback((e) => {
        let target = e.target;
        let validationErrors = null;

        if (target.tagName.toLowerCase() === 'form') {
            validationErrors = validate(e.target, constrains)
            if (!validationErrors) return null;
        } else {
            if (target.value.toString().length > 0) {
                let errors = validate.single(target.value, constrains[target.name], { format: 'detailed' } )
                if (errors) {
                    validationErrors = {[target.name]: errors}
                } else {
                    validFeedback.call(target)
                    return null;
                }
            } else {
                removeFeedback.call(target)
                return null;
            }
        }
        invalidFeedback(validationErrors)
        return true

    }, []);

    return (
        <div className="container my-3">
            <div className="row justify-content-md-center">
                <div className="col col-lg-5 col-md-5 col-sm-5">
                    <div className="card">
                        <div className="card-header text-center">
                            SignUp Page
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
                            <form
                                id="signup-form"
                                className="needs-validation"
                                noValidate
                                onSubmit={handleForm}
                            >
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
                                        required
                                        autoComplete="off"
                                        placeholder=""
                                        className="form-control"
                                        value={formData.email}
                                        onChange={handleChange}
                                        onBlur={validateInput}
                                    />
                                    <div id="email-feedback" name="email"></div>
                                </div>
                                {state.error.email ? (
                                    <div className="invalid-feedback">
                                        {state.error.email}
                                    </div>
                                ) : null}

                                <div className="mb-2">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        required
                                        autoComplete="off"
                                        placeholder=""
                                        className="form-control"
                                        value={formData.password}
                                        onChange={handleChange}
                                        onBlur={validateInput}
                                    />
                                    <div id="password-feedback"></div>
                                </div>

                                <div className="mb-2">
                                    <label htmlFor="passwordConfirmation">
                                        Password confirmation
                                    </label>
                                    <input
                                        type="password"
                                        name="passwordConfirmation"
                                        required
                                        autoComplete="off"
                                        placeholder=""
                                        className="form-control"
                                        value={formData.passwordConfirmation}
                                        onChange={handleChange}
                                        onBlur={validateInput}
                                    />
                                    <div
                                        id="passwordConfirmation-feedback"
                                        style={{ whiteSpace: "pre" }}
                                    ></div>
                                </div>
                                <div className="mb-2">
                                    <p
                                        disabled
                                        className="text-center border-0 form-control"
                                        aria-describedby="response"
                                    >
                                        {message}
                                    </p>
                                </div>

                                <div className="row justify-content-center">
                                    <div className="col col-auto">
                                        <button
                                            // disabled={state.isAuthenticated}
                                            type="submit"
                                            className="btn btn-light"
                                        >
                                            Submit
                                        </button>
                                        <p>
                                            {isLoading || isFetching
                                                ? "loading..."
                                                : ""}
                                        </p>
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
