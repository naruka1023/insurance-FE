import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getProducts = () => axios.get(`${API_URL}/getProducts`);
export const calculatePremium = (data: any) => axios.post(`${API_URL}/premium-calculation`, data);
