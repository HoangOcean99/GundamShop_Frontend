import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import axiosClient from "./axiosClient";


export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    const token = await user.getIdToken();

    localStorage.setItem("token", token);

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