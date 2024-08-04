// noinspection JSAnnotator

import app from "../../axios.ts";

export async function profile(token: string){



    return await app.get('/profile', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export default profile