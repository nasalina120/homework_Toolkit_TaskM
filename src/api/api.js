import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
});

export const getTasks = () => axiosInstance.get('todos?_limit=5');

export const getUsersAPI = () => axios.get('https://randomuser.me/api/');
