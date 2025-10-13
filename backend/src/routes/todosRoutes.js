import express from 'express'
import { protect } from '../middleware/auth.js';

import {

    getTodosByUserId,
    getTodoByTodoId,
    addTodo,
    updateTodo,
} from "../controllers/todosControllers.js";

const router=express.Router()


router.get('/', protect, getTodosByUserId)
router.get('/:user_id/:todo_id', getTodoByTodoId)
router.post('/add', protect, addTodo)
router.put('/:todo_id', protect, updateTodo)

export default router

