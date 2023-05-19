import axios from 'axios';

const fetchClient = () => {
    const defaultOptions = {
        baseURL: "http://localhost:9000",
        method: 'get' || 'delete' || 'post' || 'patch',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    let instance = axios.create(defaultOptions);
    instance.interceptors.request.use(function (config: any) {
        const token = sessionStorage.getItem('access-token');
        config.headers["x-access-token"] = token ? `${token}` : '';
        return config;
    });

    return instance;
};

export default fetchClient();