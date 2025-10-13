import express from 'express'
import { protect } from '../middleware/auth.js';

import {
    getAllUsers,
    getSpecificUser,
    addUser,
    updateUser,
    deleteUser,
    signIn
} from "../controllers/userControllers.js";

const router=express.Router()


router.get('/', getAllUsers)
router.get('/user', protect, getSpecificUser)
router.post('/signup', addUser)
router.post('/signin', signIn)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router

