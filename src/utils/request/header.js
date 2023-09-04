import axios from 'axios';

export const request = axios.create({
    baseURL: 'http://localhost:8088/quanlykhoaluan/',
});

export const HEADER = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true'
};
