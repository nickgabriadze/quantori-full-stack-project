import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

app.get('/profile', (req: express.Request, res: express.Response) => {

})


app.post('/login', (req: express.Request, res: express.Response) => {

})


app.listen('3000', () => {
    console.log('Server started on port 3000')
})