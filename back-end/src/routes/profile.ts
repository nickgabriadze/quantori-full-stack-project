import express, {Router} from "express";
import decodeToken from "../utils/decodeToken";
import {User} from "../types/user";
import getUser from "../utils/getUser";


const profileRoute = Router()

profileRoute.get('/', async (req: express.Request, res: express.Response) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = decodeToken(token)

        if (decoded === undefined) {
            res.send({
                status: 401,
                message: "Wrong or expired Bearer token was provided"
            })
        } else {

            const user: User = await getUser('./db/users.csv', String(decoded["email"]))
            if (user) {
                res.send({
                    status: 200,
                    data: {
                        username: `${user.f_name} ${user.l_name}`,
                        email: user.email,
                    }
                })
            } else {
                res.send({
                    status: 404,
                    message: "User not found"
                })
            }

        }
    } catch (err) {
        res.send({
            status: 500,
            message: "Internal Server Error"
        })
    }


});


export default profileRoute
