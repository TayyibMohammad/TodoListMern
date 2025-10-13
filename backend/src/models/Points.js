import mongoose from "mongoose";


const dailyPointsSchema = new mongoose.Schema(
    {
        date: {
            type: Date,
            default: Date.now,
            required: true,
        },

        value: {
            type: Number,
            required: true
        }
    },
    {_id: false}
)

export default dailyPointsSchema