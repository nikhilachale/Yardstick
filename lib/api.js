// lib/api.js
import axios from 'axios';

const API_BASE = '/api/transactions';

export const fetchTransactions = () => axios.get(API_BASE);
export const addTransaction = (data) => axios.post(API_BASE, data);
export const updateTransaction = (id, data) => axios.put(`${API_BASE}/${id}`, data);
export const deleteTransaction = (id) => axios.delete(`${API_BASE}/${id}`);