import axios from 'axios';

export default axios.create({
    headers: {
        Authorization: 'Basic cmVzdDp0b3R2c0ByZXN0'
    },
    baseURL: '/api'
});