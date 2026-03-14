import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import axiosClient from "./axiosClient";

const provider = new GoogleAuthProvider();

export const loginByFirebase = async () => {
    try {
        const userCredential = await signInWithPopup(auth, provider);

        const user = userCredential.user;

        const token = await user.getIdToken();

        localStorage.setItem("avatar", user.photoURL);

        const res = await axiosClient.post(
            "/users/login",
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return res;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};

export const logout = async () => {
    try {
        await signOut(auth);
        localStorage.clear();
        console.log("User logged out successfully");
    } catch (error) {
        console.error("Logout error:", error);
        throw error;
    }
};