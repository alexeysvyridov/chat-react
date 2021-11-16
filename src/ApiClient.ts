import Axios, {AxiosInstance} from 'axios';

let appConfig = {
    baseURL: 'http://localhost:3000'
}

interface ApiConfiguration {
    accessToken?:string;
}
interface HttpHeaders {
    [key: string]: string
}
interface RequestConfig {
    headers:HttpHeaders
}

export interface IApiClient {
   post<TRequest, TResponse>(
    path: string,
    object: TRequest,
    config?: RequestConfig
  ): Promise<TResponse>;
    get<TResponse>(
        path: string
    ):Promise<TResponse>
}
 class ApiClient implements IApiClient {
    private client: AxiosInstance;

    protected createAxiosClient(apiConfiguration: ApiConfiguration):AxiosInstance {
        return Axios.create({
            baseURL: appConfig.baseURL,
            responseType: 'json' as const,
            headers: {
                'Content-Type': 'application/json',
                ...(apiConfiguration?.accessToken && {
                    Authorization: `Token ${apiConfiguration?.accessToken}`
                })
            }
        })
    }

    constructor(apiConfiguration: ApiConfiguration) {
        this.client = this.createAxiosClient(apiConfiguration)
    }

    async post<TRequest, TResponse>(
        path: string,
        payload: any,
        config?: RequestConfig
    ): Promise<TResponse> {
        try {
            const response = config 
                ? await this.client.post<TResponse>(path, payload, config)
                : await this.client.post<TResponse>(path, payload);
            return response.data;
        } catch (error) {
            console.log(error)
        }
        return {} as TResponse;
    }
    async get<TResponse>(
        path: string
    ): Promise<TResponse> {
        try {
            const response = await this.client.get(path);
            return response.data
        } catch (error) {
            console.log(error)
        }
        return {} as TResponse;
    }
}

export default ApiClient;