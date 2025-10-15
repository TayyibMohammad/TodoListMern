import User from '../models/Users.js';

export async function getTodoByTodoId(req, res){
    try{
        const {user_id, todo_id} = req.params;

        const user =  await User.findById(user_id);
        if(!user){
            return res.status(404).json({message: "User not found"})
        }

        const todo=user.todos.id(todo_id)
        if(!todo){
            return res.status(404).json({message: "Todo not found"})
        }

        res.status(200).json(todo)
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

export async function getTodosByUserId(req, res) {
    try{
        const user_id = req.user.id;
        const user=await User.findById(user_id, 'todos')

        if(!user){
            return res.status(404).json({message: user_id})
        }

        res.status(200).json(user.todos)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

export async function addTodo(req, res){
    try{

        const user_id = req.user.id;
        const newTodoData= req.body
        const updatedUser= await User.findByIdAndUpdate(
            user_id,
            {$push: {todos: newTodoData}},
            {new: true}
        );

    
        if(!updatedUser){
            return res.status(404).json({message: user_id})
        }
    
        const addedTodo=updatedUser.todos[updatedUser.todos.length-1]
        res.status(201).json(addedTodo)
    }catch(error){
        res.status(400).json({message: error.message})
    }
}

export async function updateTodo(req, res) {
    try{
        const user_id = req.user.id;
        const updateTodoData=req.body;
        const todo_id=req.params.todo_id;

        const user = await User.findById(user_id);
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }
        const todo = user.todos.id(todo_id);
        if (!todo) {
            return res.status(404).json({message: "Todo not found"});
        }
        todo.set(updateTodoData);
        await user.save();
        res.status(200).json(todo);
    }catch(error){
        res.status(400).json({message: error.message})
    }
}