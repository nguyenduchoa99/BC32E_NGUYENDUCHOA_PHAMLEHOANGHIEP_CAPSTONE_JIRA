import axios from "axios";
const baseURL = "https://jiranew.cybersoft.edu.vn/api/";
const TokenCyberSoft = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMkUiLCJIZXRIYW5TdHJpbmciOiIyMC8wMy8yMDIzIiwiSGV0SGFuVGltZSI6IjE2NzkyNzA0MDAwMDAiLCJuYmYiOjE2NTA0NzQwMDAsImV4cCI6MTY3OTQxODAwMH0.S7l5kogAVJjRW8mjJ5gosJraYq5ahYjrBwnMJAaGxlY";
export const AccessToken = 'AccessToken'
export const UserLogin = 'UserLogin'


export const api = axios.create();
api.interceptors.request.use(config => {
    return {
        ...config,
        baseURL: baseURL,
        headers: {
            TokenCybersoft: TokenCyberSoft,
            Authorization: 'Bearer ' + JSON.parse(localStorage.getItem(AccessToken))
        }
    }
})