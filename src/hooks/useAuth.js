import { useEffect, useState } from "react"
import apiClient from "../services/api-client";

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");

    const getToken = () => {
        const token = localStorage.getItem("authTokens");
        return token ? JSON.parse(token) : null;
    };

    const [authTokens, setAuthTokens] = useState(getToken());

    useEffect(() => {
        fetchUserProfile();
    }, [authTokens])

    const handleAPIError = (error, defaultMessage = "Something Went Wrong! Try Again") => {
        if (error.response && error.response.data) {
            const errorMessage = Object.values(error.response.data).flat().join("\n"); 
            setErrorMsg(errorMessage);
            return { success: false, message: errorMessage };
        }
        setErrorMsg(defaultMessage);
        return {
            success: false,
            message: defaultMessage,
        };
    }

    // Fetch user Profile
    const fetchUserProfile = async () => {
        try {
            const response = await apiClient.get("/auth/users/me", {
                headers: {Authorization: `JWT ${authTokens?.access}`},
            });
            // console.log(response.data);
            setUser(response.data);
        }
        catch (error) {
            console.log("Error Fetching user", error);
        }
    };

    // Update user Profile
    const updateUserProfle = async(data) => {
        setErrorMsg("")
        try{
            await apiClient.put("/auth/users/me/", data, {headers: {Authorization: `JWT ${authTokens?.access}`}, });
        }catch(error){
            // console.log(error);
            return handleAPIError(error);
        }
    };

    // Password Change
    const changePassword = async (data) => {
        setErrorMsg("");
        
        try{
            await apiClient.post("/auth/users/set_password/", data, {headers: {Authorization: `JWT ${authTokens?.access}`}, });
            alert("password change")
        }catch(error){
            // console.log(error);
            return handleAPIError(error);
        }
    };

    // Login User
    // const loginUser = async (email, password) => {
    const loginUser = async (userData) => {
        setErrorMsg("");
        try {
            // console.log(userData);
            // const response = await apiClient.post("/auth/jwt/create/", {email, password});
            const response = await apiClient.post("/auth/jwt/create/", userData);
            // console.log(response.data);
            setAuthTokens(response.data);
            localStorage.setItem("authTokens", JSON.stringify(response.data));

            // After login set user
            await fetchUserProfile();
        }
        catch (error) {
            // console.log("Login Error", error.data?.response);
            // console.log("Login Error", error.response.data?.detail);
            setErrorMsg(error.response.data?.detail);
        }
    };

    // Register User
    const registerUser = async (userData) => {
        setErrorMsg("");
        try {
            await apiClient.post("/auth/users/", userData);
            return {
                success: true,
                message: "Registration successfull. Check your email to activate your account.",
            };
        } 
        catch (error) {
            // if (error.response && error.response.data) {
            //     const errorMessage = Object.values(error.response.data).flat().join("\n"); 
            //     setErrorMsg(errorMessage);
            //     return { success: false, message: errorMessage };
            // }
            // setErrorMsg("Registratation failed. Please try again");
            // return {
            //     success: false,
            //     message: "Registratation failed. Please try again",
            // };

            return handleAPIError(error, "Registration Failed! Try Again");
        }
    };

    // Logout User
    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
    };

    return { user, errorMsg, loginUser, registerUser, logoutUser, updateUserProfle, changePassword };
    
}

export default useAuth;