import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const ArtistDashboard = () => {

    const { user } = useContext(AuthContext);

    return (
        <div className="dashboardPage">

            <div className="dashboardContent">

                <h1>Artist Dashboard</h1>

                <p>
                    Welcome, {user?.username}
                </p>

                <div className="dashboardCards">

                    <Link
                        to="/create-music"
                        className="dashboardCard"
                    >
                        <h2>🎵</h2>
                        <h3>Create Music</h3>
                        <p>
                            Upload a new music track
                        </p>
                    </Link>

                    <Link
                        to="/create-album"
                        className="dashboardCard"
                    >
                        <h2>💿</h2>
                        <h3>Create Album</h3>
                        <p>
                            Create a new album
                        </p>
                    </Link>

                </div>

            </div>

        </div>
    );
};

export default ArtistDashboard;