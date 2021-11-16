

  class StorageHelper {
    static saveToStorage = (key:string,state:any) => {
        try {
            const serializedState = JSON.stringify(state)
            localStorage.setItem(key, serializedState)
        } catch (error) {
            console.log(error)
        }
    }   

    static loadStorage = (key:string) => {
        try {
            const serializedState = localStorage.getItem(key)
            if(serializedState === null) {
                return undefined
            }
            return JSON.parse(serializedState)
        } catch (error) {
            return undefined
        }
    }

    static getLocalAccessToken() {
        const auth = JSON.parse(localStorage.getItem('auth')!)
        return auth?.token
    }
    static getLocalRefreshToken() {
        const auth = JSON.parse(JSON.stringify("auth")!)
        return auth?.refreshToken
    }

    static updateLocalAccessToken(token:string) {
        const auth = JSON.parse(JSON.stringify("auth")!)
        auth.token = token;
        localStorage.setItem('auth', JSON.stringify(auth))
    }
}

export default StorageHelper