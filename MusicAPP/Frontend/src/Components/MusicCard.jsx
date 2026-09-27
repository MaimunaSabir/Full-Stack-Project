import React, { useState } from "react";

const MusicCard = ({ title, artist, image, uri }) => {

    const [playing, setPlaying] = useState(false);

    return (
        <div className="musicCard">

            <div className="musicImage">

                <img
                    src={image}
                    alt={title}
                />

                <button
                    className="playBtn"
                    onClick={() => setPlaying(!playing)}
                >
                    {playing ? "❚❚" : "▶"}
                </button>

            </div>

            <div className="musicInfo">

                <h3>{title}</h3>

                <p>
                    {artist || "Unknown Artist"}
                </p>

            </div>

            {playing && (
                <audio
                    src={uri}
                    controls
                    autoPlay
                    onEnded={() => setPlaying(false)}
                />
            )}

        </div>
    );
};

export default MusicCard;