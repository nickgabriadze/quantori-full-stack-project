import express, {Router} from "express";
import checkUserInDatabase from "../utils/checkUserInDatabase";
import generateToken from "../utils/generateToken";


const loginRoute = Router()

loginRoute.post('/', async (req: express.Request, res: express.Response) => {

    try {
        const {email, password} = req.body;

        const user:boolean = await checkUserInDatabase('./db/users.csv', email, password);

        if (!user) {
            res.json({
                status: 403,
                message: 'User not found'
            })
        } else {
            const token = await generateToken(email);
            res.json({
                status: 200,
                message: token
            })

        }
    } catch (error) {
        res.send({
            status: 500,
            message: 'Internal Server Error',
        });
    }
});


export default loginRoute