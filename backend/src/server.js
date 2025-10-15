import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

import userRoutes from './routes/usersRoutes.js' 
import todosRoutes from './routes/todosRoutes.js'  
import { connectDB } from "./config/db.js";
import "./jobs/dailyTasks.js"     

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// initialise the express app
const app=express()
const PORT=process.env.PORT || 5000

// middleware setup
app.use(express.json())
app.use(express.urlencoded({ extended: true })); 

if(process.env.NODE_ENV !== "production"){
    app.use(cors({
        origin:"http://localhost:5173",
    }))
}

// routes
app.use('/api/users', userRoutes)
app.use('/api/todos', todosRoutes)

if(process.env.NODE_ENV === "production"){
    // From backend/src/server.js, go up to backend/, then to root, then to frontend/dist
    const frontendPath = path.join(__dirname, "../../frontend/dist")
    
    console.log("Serving static files from:", frontendPath) // Debug log
    
    app.use(express.static(frontendPath))
    
    app.get("/*", (req, res) => {
        res.sendFile(path.join(frontendPath, "index.html"))
    })
}

connectDB().then(() => {
    app.listen(PORT, ()=> {
        console.log(`app is listening at ${PORT}`)
        console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
    })
})