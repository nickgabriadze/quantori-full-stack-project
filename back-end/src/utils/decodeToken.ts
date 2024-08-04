import {decodeJwt} from 'jose'

export const decodeToken = (token: string) => {

    try {
        const decoded =  decodeJwt(token)
        if (Math.floor((new Date().getTime() / 1000)) > decoded.exp){
            return undefined
        }else{
            return decoded
        }
    } catch (err) {
        return undefined
    }

}

export default decodeToken;