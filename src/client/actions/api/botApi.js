import { getMethod, postMethod } from './http';

export default {
    getDetail: (endpoint, params) => getMethod(endpoint, params, 'auth-token'),
    updateDetail: (endpoint, body) => postMethod(endpoint, body, 'auth-token')
}