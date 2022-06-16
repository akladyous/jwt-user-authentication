import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userState } from "../features/users/userSlice.js";
import { useSignupMutation } from "../app/api/authApiSlice.js";
import { setToken } from "../features/token/tokenSlice.js";
import { verifyJWT } from "../util/verifyJWT.js";
import { setUser, setUserState } from "../features/users/userSlice.js";
import { _objectWithoutPropertiesLoose } from "../util/babel";
import validate from "validate.js";
import { constrains } from "../util/validationConstrains";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email : '', password: '', passwordConfirmation: ''}
        this.handleChange = this.handleChange.bind(this)
        this.handleForm = this.handleForm.bind(this)
    };

    state = useSelector(userState);
    dispatch = useDispatch();
    navigate = useNavigate();
    location = useLocation();


    // from = location.state?.from?.pathname || "/";
    const [signup, { isLoading, isFetching }] = useSignupMutation();



    handleForm() {

    }

    handleChange() {

    }
    render() {
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
                                            required
                                            autoComplete="off"
                                            placeholder=""
                                            className="form-control"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                        <div id="email-feedback"></div>
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
                                        />
                                        <div id="password-feedback"></div>
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
        )
    }
}