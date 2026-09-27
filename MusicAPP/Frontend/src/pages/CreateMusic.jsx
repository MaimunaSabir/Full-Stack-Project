import React, { useState } from "react";
import axios from "axios";

const CreateMusic = () => {

    const [title, setTitle] = useState("");
    const [audio, setAudio] = useState(null);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        if (!audio) {
            setError("Please select an audio file");
            return;
        }

        const formData = new FormData();

        formData.append("title", title);
        formData.append("audio", audio);

        try {

            const response = await axios.post(
                "http://localhost:3000/api/music/create-music",
                formData,
                {
                    withCredentials: true
                }
            );

            setMessage(
                response.data.message || "Music created successfully"
            );

            setTitle("");
            setAudio(null);

            e.target.reset();

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Music upload failed"
            );

        }
    };

    return (
        <div className="createMusicPage">

            <div className="createMusicBox">

                <h1>Create Music</h1>

                <p>Upload your music track</p>

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

                    <label>Music Title</label>

                    <input
                        type="text"
                        placeholder="Enter music title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                    <label>Audio File</label>

                    <input
                        type="file"
                        accept="audio/*"
                        onChange={(e) => setAudio(e.target.files[0])}
                        required
                    />

                    <button type="submit">
                        Upload Music
                    </button>

                </form>

            </div>

        </div>
    );
};

export default CreateMusic;