import { request, HEADER } from './header';

const get = async (path, options = {}, headerOptions = {}) => {
    try {
        const response = await request.get(path, options, { ...HEADER, ...headerOptions }).catch((err) => {
            throw err;
        });
        return response.data;
    } catch (err) {
        return { ...err.response.data, status: err.response.status };
    }
};

export default get;
