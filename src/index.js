import express from 'express'
import userRoutes from './routes/user.routes.js'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())
app.use(userRoutes)

app.listen(5000)