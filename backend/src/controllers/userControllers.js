import User from "../models/Users.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



const generateToken = (id) => {
    // 1. Check if the secret key is defined (Best Practice)
    // console.log(KEY)
    // console.log(PORT)
    const KEY = process.env.JWT_SECRET
    if (!KEY) {
        throw new Error("JWT_SECRET is not defined. Cannot generate token.");
    }

    // 2. CORRECTION: The payload must be a plain object {id: id}
    return jwt.sign(
        { id }, // Correct payload: Shorthand for { id: id }
        KEY, 
        {
            expiresIn: '7d'
        }
    );
};

export async function getAllUsers(_, res) {

    try{
        const users=await User.find().select('username points').sort({createdAt: -1})
        res.status(200).json(users)
    }catch(error){
        console.error("Error in users controllers ", error)
        res.status(500).json({message: "Internal server error"})

    }
}

export async function signIn(req, res){
    try{
        const {
            email,
            password
        } = req.body
        
        // 1. Find user (Correct)
        const user = await User.findOne({email: email})
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        
        // 2. Compare passwords (Correct, assuming `brcypt` is actually `bcrypt`)
        const isMatch = await bcrypt.compare(password, user.password) 
        if(!isMatch){
            return res.status(401).json({message:"wrong credentials"})
        }

        const token = generateToken(user._id);

        return res.status(200).json({ 
            _id: user._id,
            email: user.email,
            token: token // This is the JWT: header.payload.signature
        });

    }catch(error){
        console.error("Sign-in error:", error);
        return res.status(500).json({message: "Server error during sign-in."});
    }
}

export async function getSpecificUser(req, res) {
    try{
        const user_id = req.user.id;

        const user=await User.findById(user_id)
        if(!user){
            return res.status(404).json({message: "user not found!"})
        }
        res.json({
            name:user.username,
            bio: user.bio
        })
    }catch(error){
        console.error("Error in get specific user ", error);
        res.status(500).json({message: "Internal server error"});
    }
}


export async function addUser(req, res) {
    try{
        const {
            username,
            email,
            password,
            bio
        } = req.body

        // 1. Check if user exists
        const userExist = await User.findOne({ email: email })
        if(userExist){
            // Use 409 Conflict if email is already registered
            return res.status(409).json({ message: "User already exists with this email." }) 
        }

        // 2. Hash Password (Corrected Typo)
        const salt = await bcrypt.genSalt(10) // ⬅️ FIX: Changed brcypt to bcrypt
        const hashedPassword = await bcrypt.hash(password, salt) // ⬅️ FIX: Changed brcypt to bcrypt

        // 3. Create and Save User
        const user = new User({ 
            username, 
            email, 
            password: hashedPassword, 
            bio // Include bio if it's required
        })
        
        const savedUser = await user.save()

        // 4. 🔑 CRITICAL FIX: Generate JWT
        const token = generateToken(savedUser._id);
        
        // 5. Send Success Response with Token and User Data
        res.status(201).json({
            _id: savedUser._id,
            username: savedUser.username,
            email: savedUser.email,
            token: token // ⬅️ This is the JWT
        }); 

    } catch(error) {
        // Use 400 for errors related to client data (e.g., validation failure)
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        
        console.error("Error in add user controller ", error)
        res.status(500).json({message: "Internal server error"})
    }
}

export async function updateUser(req, res) {
    try{
        const {
            username,
            email,
            bio
        }=req.body

        const updatedUser=await User.findByIdAndUpdate(
            req.params.id,
            {username, email, bio},
            {
                new:true,
            }
        )

        if(!updatedUser){
            return res.status(404).json({message:"user not found!"})
        }

        res.status(200).json(updatedUser)
    }catch(error){
        console.error("Error in update controller ", error)
        res.status(500).json({message: "Internal server error"})
    }
}

export async function deleteUser(req, res) {
    try{
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        if(!deletedUser){
            return res.status(404).json({message: "user not found!"})
        }
        res.status(200).json({message: "user deleted successfully"})
    }catch(error){
        console.error("Error in delete user controller ", error)
        res.status(500).json({message: "Internal server error"})
    }
}