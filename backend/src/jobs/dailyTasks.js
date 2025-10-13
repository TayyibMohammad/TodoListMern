import cron from 'node-cron'
import User from "../models/Users.js"

cron.schedule('0 0 * * *', async () => {
    try{
        const users = await User.find({});

        for(const user of users){
            const todos = user.todos.length;
            
            // Handle case when there are no todos
            if(todos === 0) {
                continue; // Skip this user, or set points to 0
            }

            const completedTodos = user.todos.filter(todo => todo.completed).length;
            const points = (completedTodos / todos) * 100;

            const newPointsEntry = {
                date: new Date(),
                value: points
            };

            await User.findByIdAndUpdate(user._id, {
                $push: {points: newPointsEntry},
                $set: {todos: [] }
            });
        }
        
        console.log('Daily task completed successfully');
    }catch(error){
        console.error("Error in daily tasks: ", error)
    }
});