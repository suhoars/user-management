import { getUser } from '../common/localStorage'
const axios = require('axios');
const baseUrl = process.env.REACT_APP_BASE_URL

axios.interceptors.request.use(config => {
    let user = getUser("user")
    config.headers = Object.assign({
        Authorization: `${user}`
    }, config.headers)
    return config
}); 

export const getUserList = async () => {
    const url = baseUrl + "user"
    return await axios.get(url)
}


export const register = async (params) => {
    const url = baseUrl + "user"
    const reqParams = {
        name: params.name,
        email: params.email,
        role: params.role,
        password: params.password
    }
    return await axios.post(url, reqParams);
}
export const Deleting = async(id)=>{
    const url=baseUrl+`user/${id}`
    return await axios.delete(url)
}
export const update = async (id, params) => {
   
    const url = baseUrl + `user/${id}`
    
    const reqParams = {
        name: params.name,
        email: params.email,
        role: params.role,
        password: params.password
    }
    return await axios.put(url, reqParams);

}
export const getUserById = async (id) => {
    const url = baseUrl + `user/${id}`
    return axios.get(url)
}

export const login = async (params) => {
    const url = baseUrl + "login"
    const reqParams = {
        email: params.email,
        password: params.password
    }
    return await axios.post(url, reqParams);
}