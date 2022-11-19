import express from 'express'
import userRoutes from './routes/user.routes.js'

const app = express()
app.use(express.json())
app.use(userRoutes)

app.listen(5000)