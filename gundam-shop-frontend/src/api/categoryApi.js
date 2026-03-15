import axiosClient from "./axiosClient";

export const getAllCategories = async () => {
    try {
        const response = await axiosClient.get("/categories");
        return response;
    } catch (error) {
        console.error("Error fetching all categories:", error);
        throw error;
    }
};

export const getCategoryById = async (id) => {
    try {
        const response = await axiosClient.get(`/categories/${id}`);
        return response;
    } catch (error) {
        console.error(`Error fetching category with id ${id}:`, error);
        throw error;
    }
};

export const createCategory = async (categoryData) => {
    try {
        const response = await axiosClient.post("/categories", categoryData);
        return response;
    } catch (error) {
        console.error("Error creating category:", error);
        throw error;
    }
};

export const updateCategory = async (id, categoryData) => {
    try {
        const response = await axiosClient.put(`/categories/${id}`, categoryData);
        return response;
    } catch (error) {
        console.error(`Error updating category with id ${id}:`, error);
        throw error;
    }
};

export const deleteCategory = async (id) => {
    try {
        const response = await axiosClient.delete(`/categories/${id}`);
        return response;
    } catch (error) {
        console.error(`Error deleting category with id ${id}:`, error);
        throw error;
    }
};