import React, {
    useContext,
    useState
} from "react";

import axios from "axios";

import {
    useNavigate,
    Link
} from "react-router-dom";

import {
    AuthContext
} from "../Context/AuthContext";


const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const {
        setUser
    } = useContext(AuthContext);

    const navigate = useNavigate();


    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        setLoading(true);


        try {

            const response = await axios.post(
                "http://localhost:3000/api/auth/login",
                {
                    email,
                    password
                },
                {
                    withCredentials: true
                }
            );


            setUser(response.data.user);

            navigate("/");


        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Login failed"
            );

        } finally {

            setLoading(false);
        }
    };


    return (

        <div className="authPage">

            <div className="authBox">

                <p className="pageSmallText">
                    MUSIC APP
                </p>

                <h1>
                    Welcome Back
                </h1>

                <p>
                    Login to continue listening.
                </p>


                {error && (

                    <div className="errorMessage">
                        {error}
                    </div>

                )}


                <form onSubmit={handleSubmit}>

                    <label>
                        Email
                    </label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />


                    <label>
                        Password
                    </label>

                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />


                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Logging in..."
                            : "Login"}
                    </button>

                </form>


                <p className="authBottomText">

                    Don't have an account?

                    <Link to="/register">
                        Register
                    </Link>

                </p>

            </div>

        </div>
    );
};


export default Login;