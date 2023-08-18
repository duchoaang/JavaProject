import axios from 'axios';

export const request = axios.create({
    baseURL: 'http://127.0.0.1:8088',
});

export const HEADER = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true'
};
