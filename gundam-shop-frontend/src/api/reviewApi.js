import axiosClient from "./axiosClient";

export const getAllReviews = async () => {
    try {
        const response = await axiosClient.get("/reviews");
        return response;
    } catch (error) {
        console.error("Error fetching all reviews:", error);
        throw error;
    }
};

export const getReviewById = async (id) => {
    try {
        const response = await axiosClient.get(`/reviews/${id}`);
        return response;
    } catch (error) {
        console.error(`Error fetching review with id ${id}:`, error);
        throw error;
    }
};

export const createReview = async (reviewData) => {
    try {
        const response = await axiosClient.post("/reviews", reviewData);
        return response;
    } catch (error) {
        console.error("Error creating review:", error);
        throw error;
    }
};

export const updateReview = async (id, reviewData) => {
    try {
        const response = await axiosClient.put(`/reviews/${id}`, reviewData);
        return response;
    } catch (error) {
        console.error(`Error updating review with id ${id}:`, error);
        throw error;
    }
};

export const deleteReview = async (id) => {
    try {
        const response = await axiosClient.delete(`/reviews/${id}`);
        return response;
    } catch (error) {
        console.error(`Error deleting review with id ${id}:`, error);
        throw error;
    }
};