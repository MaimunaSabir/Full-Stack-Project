import {BrowserRouter,Routes,Route} from "react-router-dom";
import Navbar from "./Components/Navbar";
import ArtistRoute from "./Components/ArtistRoute";
import Home from "./pages/Home";
import Albums from "./pages/Albums";
import AlbumDetails from "./pages/AlbumDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ArtistDashboard from "./pages/ArtistDashboard";
import CreateMusic from "./pages/CreateMusic";
import CreateAlbum from "./pages/CreateAlbum";


function App() {

    return (

        <BrowserRouter>

            <Navbar />

            <Routes>
                <Route path="/" element={<Home />}/>

                <Route path="/albums"  element={<Albums />}/>

                <Route path="/album/:id" element={<AlbumDetails />}/>

                <Route  path="/login"  element={<Login />} />

                <Route path="/register" element={<Register />}/>

                <Route path="/artist-dashboard" element={
                        <ArtistRoute>
                            <ArtistDashboard />
                        </ArtistRoute>
                    } />


                <Route path="/create-music"
                    element={
                        <ArtistRoute>
                            <CreateMusic />
                        </ArtistRoute>
                    }
                />


                <Route
                    path="/create-album"
                    element={
                        <ArtistRoute>
                            <CreateAlbum />
                        </ArtistRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}


export default App;