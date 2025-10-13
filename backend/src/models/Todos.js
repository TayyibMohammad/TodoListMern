import mongoose from "mongoose";
import {v4 as uuidv4} from 'uuid'

const dailyTodosSchema = new mongoose.Schema(
    {
        _id: {
            type:String,
            default: uuidv4,
            required: true
        },

        title:{
            type:String,
            required: true,
            trim: true

        },

        description: {
            type:String,
            required:false,
            trim: true
        },

        color: {
            type: String,
            required: false,
            default: '#FFFFFF',
        },

        completed: {
            type:Boolean,
            default: false,
        }
    }
)

export default dailyTodosSchema