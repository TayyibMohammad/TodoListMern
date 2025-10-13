import mongoose from 'mongoose'
import dailyTodosSchema from './Todos.js'
import dailyPointsSchema from './Points.js'

import {v4 as uuidv4} from 'uuid'

const userSchema = new mongoose.Schema(
    {   
        _id: {
            type:String,
            default: () => uuidv4(),
        },
        username: {
            type:String,
            required:true,
            unique: true,
            trim: true

        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: /^\S+@\S+\.\S+$/ // A regex for email validation
        },

        password:{
            type: String,
            trim:true,
            required:true
        },

        bio: {
            type: String,
            default:"",
            trim: true,
        },

        points: {
            type:[dailyPointsSchema],
            required: false,
            default: []
        },

        todos: {
            type:[dailyTodosSchema],
            required:false,
            default: []
        }
        
    }
)

const User=mongoose.model('User', userSchema)

export default User