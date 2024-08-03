import jose from 'jose'
export const decodeToken = (token: string) => {

    console.log(jose.decodeJwt(token))
}

export default decodeToken;