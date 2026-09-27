import React, {
    useContext
} from "react";

import {
    Navigate
} from "react-router-dom";

import {
    AuthContext
} from "../Context/AuthContext";


const ArtistRoute = ({ children }) => {

    const {
        user,
        loading
    } = useContext(AuthContext);


    if (loading) {

        return (
            <div className="homeLoading">
                Loading...
            </div>
        );
    }


    if (!user) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }


    if (user.role !== "artist") {

        return (
            <Navigate
                to="/"
                replace
            />
        );
    }


    return children;
};


export default ArtistRoute;