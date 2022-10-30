import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoute from './routes/auth.js'
import userRoute from './routes/user.js'
import postRoute from './routes/post.js'

dotenv.config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log('Connected to MongoDB')
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

connectDB()

const app = express()

app.use(cors())
app.use(express.json())


// ROUTES
app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api/post', postRoute)


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`)
})