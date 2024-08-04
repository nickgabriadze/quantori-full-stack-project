import express from 'express';
import cors from 'cors';
import checkUserInDatabase from "./utils/checkUserInDatabase";
import generateToken from "./utils/generateToken";
import decodeToken from "./utils/decodeToken";
import {User} from "./types/user";
import getUser from "./utils/getUser";
const app = express();

app.use(express.json());
app.use(cors());

app.get('/profile', async (req: express.Request, res: express.Response) => {
    const token = req.headers.authorization.split(' ')[1]
    const decoded = decodeToken(token)

    if (decoded === undefined) {
        res.send({
            status: 401,
            message: "Wrong or expired Bearer token was provided"
        })
    }else{

        const user:User = await getUser('./db/users.csv', String(decoded["email"]))
        if (user){
            res.send({
                status: 200,
                data: {
                    username: `${user.f_name} ${user.l_name}`,
                    email: user.email,
                }
            })
        }else{
            res.send({
                status: 404,
                message: "User not found"
            })
        }

    }


});

app.post('/login', async (req: express.Request, res: express.Response) => {
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

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
