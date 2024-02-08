import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import APPROUTES from './src/routes/index.js'
dotenv.config()
const PORT = process.env.PORT
const app = express()
app.use(cors())
app.use(express.json())
app.use(APPROUTES)

app.listen(PORT,()=>{
    console.log(`app is listening to ${PORT}`)
})