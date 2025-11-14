import axios from 'axios';

// Equipment API
const EQUIP_URL = 'http://localhost:5000/api/equipment';
export const getEquipment = () => axios.get(EQUIP_URL);
export const addEquipment = (item) => axios.post(EQUIP_URL, item);
export const updateEquipment = (id, data) => axios.patch(`${EQUIP_URL}/${id}`, data);
export const deleteEquipment = (id, userName) => axios.delete(`http://localhost:5000/api/equipment/${id}?userName=${encodeURIComponent(userName)}`);

// Auth API
const AUTH_URL = 'http://localhost:5000/api/auth';
export const loginUser = (userData) => axios.post(`${AUTH_URL}/login`, userData);
export const registerUser = (userData) => axios.post(`${AUTH_URL}/register`, userData);

