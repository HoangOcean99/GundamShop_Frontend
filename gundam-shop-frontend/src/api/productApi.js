import axiosClient from "./axiosClient";

export const getAllProducts = async (params = {}) => {
    try {
        const response = await axiosClient.get("/products", { params });
        return response;
    } catch (error) {
        console.error("Error fetching all products:", error);
        throw error;
    }
};

export const getProductById = async (id) => {
    try {
        const response = await axiosClient.get(`/products/${id}`);
        return response;
    } catch (error) {
        console.error(`Error fetching product with id ${id}:`, error);
        throw error;
    }
};

export const createProduct = async (productData) => {
    try {
        const response = await axiosClient.post("/products", productData);
        return response;
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }
};

export const updateProduct = async (id, productData) => {
    try {
        const response = await axiosClient.put(`/products/${id}`, productData);
        return response;
    } catch (error) {
        console.error(`Error updating product with id ${id}:`, error);
        throw error;
    }
};

export const deleteProduct = async (id) => {
    try {
        const response = await axiosClient.delete(`/products/${id}`);
        return response;
    } catch (error) {
        console.error(`Error deleting product with id ${id}:`, error);
        throw error;
    }
};