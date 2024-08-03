import express from 'express';
import cors from 'cors';
import checkUserInDatabase from "./utils/checkUserInDatabase";
import generateToken from "./utils/generateToken";
import {User} from "./types/user";

const app = express();

app.use(express.json());
app.use(cors());

app.get('/profile', async (req: express.Request, res: express.Response) => {


});

app.post('/login', async (req: express.Request, res: express.Response) => {
    try {
        const {email, password} = req.body;


        const user: User = await checkUserInDatabase('./db/users.csv', email, password);

        if (!user) {
            res.json({
                status: 403,
                message: 'User not found'
            })
        } else {
            const token = await generateToken(user.id, user.email);
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

app.listen(3001, () => {
    console.log('Server started on port 3001');
});
