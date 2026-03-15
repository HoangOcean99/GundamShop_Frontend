import axiosClient from "./axiosClient";

export const getAllUsers = async () => {
    try {
        const response = await axiosClient.get("/users");
        return response;
    } catch (error) {
        console.error("Error fetching all users:", error);
        throw error;
    }
};

export const getUserById = async (id) => {
    try {
        const response = await axiosClient.get(`/users/${id}`);
        return response;
    } catch (error) {
        console.error(`Error fetching user with id ${id}:`, error);
        throw error;
    }
};

export const createUser = async (userData) => {
    try {
        const response = await axiosClient.post("/users", userData);
        return response;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};

export const updateUser = async (id, userData) => {
    try {
        const response = await axiosClient.put(`/users/${id}`, userData);
        return response;
    } catch (error) {
        console.error(`Error updating user with id ${id}:`, error);
        throw error;
    }
};

export const deleteUser = async (id) => {
    try {
        const response = await axiosClient.delete(`/users/${id}`);
        return response;
    } catch (error) {
        console.error(`Error deleting user with id ${id}:`, error);
        throw error;
    }
};

export const getUserByFirebaseId = async (firebaseId) => {
    try {
        const response = await axiosClient.get(`/users/firebase/${firebaseId}`);
        return response;
    } catch (error) {
        console.error(`Error fetching user with firebaseId ${firebaseId}:`, error);
        throw error;
    }
};