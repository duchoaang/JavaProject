import axios from 'axios';

export const request = axios.create({
    baseURL: 'http://127.0.0.1:5000',
});

export const HEADER = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
};
