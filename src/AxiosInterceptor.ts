
import axios, {AxiosInstance, AxiosRequestConfig} from 'axios'
import StorageHelper from './localStorage'

const applyInstanse = (axios_instance: AxiosInstance) => {
    axios.interceptors.request.use(
        (config:AxiosRequestConfig) => {
            const token = StorageHelper.getLocalAccessToken()
            if(token &&  config?.headers) {
                config.headers["x-access-token"] = token;
            }
            return config;
        }, error => {
            return Promise.reject(error)
        })
        
        
         axios.interceptors.response.use((response) => {
             return response
         },
         async err => {
             const originalConfig = err.config;
            if(originalConfig.url !== "/login" && err.response) {
                if(err.response.status === 401 && !originalConfig._retry) {
                    originalConfig._retry = true;
        
                    try {
                        const rs = await axios_instance.post('/auth/refreshtoken', {
                            refreshToken: StorageHelper.getLocalRefreshToken()
                        })
                        const {token}:any = rs.data;
                        StorageHelper.updateLocalAccessToken(token);
                        return axios_instance(originalConfig)
                    } catch (error) {
                        return Promise.reject(error)
                    }
                    // return axios_instance(config)
                }
            }
            return Promise.reject(err)
         })
}
export default applyInstanse;