import React, {
    useContext,
    useState
} from "react";

import {
    Link,
    useNavigate
} from "react-router-dom";

import axios from "axios";

import {
    AuthContext
} from "../Context/AuthContext";


const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    const {
        user,
        setUser
    } = useContext(AuthContext);

    const navigate = useNavigate();


    const handleLogout = async () => {

        try {

            await axios.post(
                "http://localhost:3000/api/auth/logout",
                {},
                {
                    withCredentials: true
                }
            );

            setUser(null);

            setMenuOpen(false);

            navigate("/");

        } catch (error) {

            console.log(error);
        }
    };


    return (
        <>
            <nav className="navbar">

                <Link
                    to="/"
                    className="logo"
                >
                    🎵 Music APP
                </Link>


                <div className="Nlink">

                    <Link to="/">
                        Home
                    </Link>

                    <Link to="/albums">
                        Albums
                    </Link>

                    {user?.role === "artist" && (

                        <Link to="/artist-dashboard">
                            Dashboard
                        </Link>

                    )}

                </div>


                <div className="Nbtn">

                    {!user ? (

                        <>
                            <Link
                                className="loginBtn"
                                to="/login"
                            >
                                Login
                            </Link>

                            <Link
                                className="regBtn"
                                to="/register"
                            >
                                Register
                            </Link>
                        </>

                    ) : (

                        <>

                            <span className="userName">
                                {user.username}
                            </span>

                            <button
                                className="logoutBtn"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>

                        </>

                    )}

                </div>


                <button
                    className="menuBtn"
                    onClick={() =>
                        setMenuOpen(!menuOpen)
                    }
                >
                    {menuOpen ? "✕" : "☰"}
                </button>

            </nav>


            {menuOpen && (

                <div className="mobileMenu">

                    <Link
                        to="/"
                        onClick={() =>
                            setMenuOpen(false)
                        }
                    >
                        Home
                    </Link>

                    <Link
                        to="/albums"
                        onClick={() =>
                            setMenuOpen(false)
                        }
                    >
                        Albums
                    </Link>


                    {user?.role === "artist" && (

                        <Link
                            to="/artist-dashboard"
                            onClick={() =>
                                setMenuOpen(false)
                            }
                        >
                            Dashboard
                        </Link>

                    )}


                    {!user ? (

                        <>
                            <Link
                                to="/login"
                                className="MloginBtn"
                                onClick={() =>
                                    setMenuOpen(false)
                                }
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="MregBtn"
                                onClick={() =>
                                    setMenuOpen(false)
                                }
                            >
                                Register
                            </Link>
                        </>

                    ) : (

                        <>

                            <span className="mobileUserName">
                                {user.username}
                            </span>

                            <button
                                className="mobileLogoutBtn"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>

                        </>

                    )}

                </div>

            )}

        </>
    );
};


export default Navbar;