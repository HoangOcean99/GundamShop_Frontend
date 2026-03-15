import axiosClient from "./axiosClient";

export const getAllOrders = async () => {
    const response = await axiosClient.get("/orders");
    return response;
};

export const getOrderById = async (id) => {
    const response = await axiosClient.get(`/orders/${id}`);
    return response;
};

export const createOrder = async (orderData) => {
    const response = await axiosClient.post("/orders", orderData);
    return response;
};

export const updateOrder = async (id, orderData) => {
    const response = await axiosClient.put(`/orders/${id}`, orderData);
    return response;
};

export const getOrdersByUser = async () => {
    const response = await axiosClient.get("/orders/user/orders");
    return response;
};