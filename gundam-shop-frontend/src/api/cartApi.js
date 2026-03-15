import axiosClient from "./axiosClient";

export const getAllCarts = async () => {
    try {
        const response = await axiosClient.get("/carts");
        return response;
    } catch (error) {
        console.error("Error fetching all carts:", error);
        throw error;
    }
};

export const getCartById = async (id) => {
    try {
        const response = await axiosClient.get(`/carts/${id}`);
        return response;
    } catch (error) {
        console.error(`Error fetching cart with id ${id}:`, error);
        throw error;
    }
};

export const createCart = async (cartData) => {
    try {
        const response = await axiosClient.post("/carts", cartData);
        return response;
    } catch (error) {
        console.error("Error creating cart:", error);
        throw error;
    }
};

export const updateCart = async (id, cartData) => {
    try {
        const response = await axiosClient.put(`/carts/${id}`, cartData);
        return response;
    } catch (error) {
        console.error(`Error updating cart with id ${id}:`, error);
        throw error;
    }
};

export const deleteCart = async (id) => {
    try {
        const response = await axiosClient.delete(`/carts/${id}`);
        return response;
    } catch (error) {
        console.error(`Error deleting cart with id ${id}:`, error);
        throw error;
    }
};