import { auth } from '@/auth';
import axios, { AxiosError } from 'axios';
import { redirect } from 'next/navigation';

const Api = axios.create({
    baseURL: 'https://api.estrategiaconcursos.com.br/api/',
    headers: {
        Accept: 'application/json',
        "Content-Type": 'application/json'
    }
})

Api.interceptors.request.use(async config => {

    const session = await auth()

    if(session?.token) {
        config.headers.Authorization = `Bearer ${session.token}`
    }

    return config
})

Api.interceptors.response.use(null, (error: AxiosError) => {

    console.log("###")
    if(error.status == 401) {
        redirect('/login')        
    }

    return Promise.reject(error)
})

export default Api;