import React, {
    createContext,
    useEffect,
    useState
} from "react";

import axios from "axios";

export const AuthContext = createContext();


const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const getUser = async () => {

        try {

            const response = await axios.get(
                "http://localhost:3000/api/auth/getUser",
                {
                    withCredentials: true
                }
            );

            setUser(response.data.user);

        } catch (error) {

            setUser(null);

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {

        getUser();

    }, []);


    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                getUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};


export default AuthContextProvider;