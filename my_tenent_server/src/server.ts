import express from 'express';
const AuthRoutes=require('./routes/auth')
const {ConnectDB} = require('./config/db')
const getUsersRoutes=require('./routes/getUsers')
import { verifyToken } from "./middleware/authMiddleware";




const port = 5000

const app = express()

app.use(express.json())

app.use('/auth',AuthRoutes)
app.use('/users',verifyToken,getUsersRoutes)

ConnectDB();

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`)
})
