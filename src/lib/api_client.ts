import axios from 'axios';

const ApiClient = axios.create({
    baseURL: 'https://api.estrategiaconcursos.com.br/api/',
    headers: {
        Accept: 'application/json',
        "Content-Type": 'application/json'
    }
})

ApiClient.interceptors.request.use(async config => {

    const { data } = await axios.get(`/api/me`);

    if (data?.token) {
        config.headers.Authorization = `Bearer ${data.token}`
    }

    return config
})

export { ApiClient };

