import express from 'express';
import cors from 'cors';
import loginRoute from "./routes/login";
import profileRoute from "./routes/profile";
const app = express();

app.use(express.json());
app.use(cors());


app.use('/profile', profileRoute)
app.use('/login', loginRoute)


app.listen(3000, () => {
    console.log('Server started on port 3000');
});
