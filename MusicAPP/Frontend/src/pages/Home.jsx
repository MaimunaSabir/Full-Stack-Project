import React, {
    useEffect,
    useState
} from "react";

import axios from "axios";

import MusicCard from "../Components/MusicCard";
import AlbumCard from "../Components/AlbumCard";


const Home = () => {

    const [music, setMusic] = useState([]);
    const [albums, setAlbums] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    const getData = async () => {

        try {

            const [
                musicResponse,
                albumResponse
            ] = await Promise.all([

                axios.get(
                    "http://localhost:3000/api/music"
                ),

                axios.get(
                    "http://localhost:3000/api/music/album"
                )

            ]);


            setMusic(
                musicResponse.data.music || []
            );

            setAlbums(
                albumResponse.data.album || []
            );


        } catch (error) {

            console.log(error);

            setError(
                error.response?.data?.message ||
                "Failed to load music"
            );

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {

        getData();

    }, []);


    if (loading) {

        return (
            <div className="homeLoading">
                Loading music...
            </div>
        );
    }


    return (

        <div className="home">

            <div className="homeContent">

                <section className="heroSection">

                    <div className="heroText">

                        <p className="heroSmallText">
                            YOUR MUSIC, YOUR WORLD
                        </p>

                        <h1>
                            Feel the Music
                        </h1>

                        <p>
                            Listen to your favorite music
                            and discover new sounds.
                        </p>

                        <button
                            className="exploreBtn"
                            onClick={() =>
                                document
                                    .getElementById(
                                        "popularMusic"
                                    )
                                    ?.scrollIntoView({
                                        behavior: "smooth"
                                    })
                            }
                        >
                            Explore Music
                        </button>

                    </div>

                </section>


                {error && (

                    <div className="errorMessage">
                        {error}
                    </div>

                )}


                <section
                    id="popularMusic"
                    className="musicSection"
                >

                    <div className="sectionHeading">

                        <div>

                            <p>
                                DISCOVER
                            </p>

                            <h2>
                                Popular Music
                            </h2>

                        </div>

                    </div>


                    <div className="musicGrid">

                        {music.length > 0 ? (

                            music.map((item) => (

                                <MusicCard
                                    key={item._id}
                                    title={item.title}
                                    artist={
                                        item.artist?.username
                                    }
                                    uri={item.uri}
                                    image={`https://picsum.photos/300/300?random=${item._id}`}
                                />

                            ))

                        ) : (

                            <p className="emptyMessage">
                                No music available yet.
                            </p>

                        )}

                    </div>

                </section>


                <section className="albumSection">

                    <div className="sectionHeading">

                        <div>

                            <p>
                                COLLECTION
                            </p>

                            <h2>
                                Popular Albums
                            </h2>

                        </div>

                    </div>


                    <div className="albumGrid">

                        {albums.length > 0 ? (

                            albums.map((album) => (

                                <AlbumCard
                                    key={album._id}
                                    id={album._id}
                                    title={album.title}
                                    artist={
                                        album.artist?.username
                                    }
                                    image={`https://picsum.photos/300/300?random=${album._id}`}
                                />

                            ))

                        ) : (

                            <p className="emptyMessage">
                                No albums available yet.
                            </p>

                        )}

                    </div>

                </section>

            </div>

        </div>
    );
};


export default Home;