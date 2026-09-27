import React from "react";
import { Link } from "react-router-dom";

const AlbumCard = ({ id, title, artist, image }) => {

    return (
        <Link to={`/album/${id}`}  className="albumCard">

            <div className="albumImage">

                <img src={image} alt={title}/>

            </div>

            <h3>{title}</h3>

            <p>
                {artist || "Unknown Artist"}
            </p>

        </Link>
    );
};

export default AlbumCard;