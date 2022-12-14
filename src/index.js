import express from 'express'
import userRoutes from './routes/user.routes.js'
import walletRoutes from './routes/wallet.routes.js'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())
app.use(userRoutes)
app.use(walletRoutes)

const port = process.env.PORT || 5000

app.listen(port)