import app from '../../axios.ts'
import {AxiosResponse} from "axios";

export async function login(
    email: string,
    password: string
):Promise<AxiosResponse<{
    status: number,
    message: string
}>> {


    return await app.post('/login', {
        email: email,
        password: password
    })
}


export default login