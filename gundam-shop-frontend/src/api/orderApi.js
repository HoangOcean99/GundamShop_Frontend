import axiosClient from "./axiosClient";

export const getAllOrders = async () => {
    try {
        const response = await axiosClient.get("/orders");
        return response;
    } catch (error) {
        console.error("Error fetching all orders:", error);
        throw error;
    }
};

export const getOrderById = async (id) => {
    try {
        const response = await axiosClient.get(`/orders/${id}`);
        return response;
    } catch (error) {
        console.error(`Error fetching order with id ${id}:`, error);
        throw error;
    }
};

export const createOrder = async (orderData) => {
    try {
        const response = await axiosClient.post("/orders", orderData);
        return response;
    } catch (error) {
        console.error("Error creating order:", error);
        throw error;
    }
};

export const updateOrder = async (id, orderData) => {
    try {
        const response = await axiosClient.put(`/orders/${id}`, orderData);
        return response;
    } catch (error) {
        console.error(`Error updating order with id ${id}:`, error);
        throw error;
    }
};

export const deleteOrder = async (id) => {
    try {
        const response = await axiosClient.delete(`/orders/${id}`);
        return response;
    } catch (error) {
        console.error(`Error deleting order with id ${id}:`, error);
        throw error;
    }
};

export const getOrdersByUser = async () => {
    try {
        const response = await axiosClient.get("/orders/user/orders");
        return response;
    } catch (error) {
        console.error("Error fetching orders by user:", error);
        throw error;
    }
};