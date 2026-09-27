import React, { useState } from "react";
import axios from "axios";

const Register = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        try {

            const response = await axios.post(
                "http://localhost:3000/api/auth/register",
                {
                    username,
                    email,
                    password,
                    role
                },
                {
                    withCredentials: true
                }
            );

            setMessage(response.data.message || "Registration successful");

            setUsername("");
            setEmail("");
            setPassword("");
            setRole("user");

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Registration failed"
            );

        }
    };

    return (
        <div className="authPage">

            <div className="authBox">

                <h1>Create Account</h1>

                <p>Create your Music APP account</p>

                {message && (
                    <div className="successMessage">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="errorMessage">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <label>Username</label>

                    <input
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <label>Email</label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label>Password</label>

                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <label>Account Type</label>

                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="user">User</option>
                        <option value="artist">Artist</option>
                    </select>

                    <button type="submit">
                        Register
                    </button>

                </form>

            </div>

        </div>
    );
};

export default Register;