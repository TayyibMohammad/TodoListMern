import jwt, { decode } from 'jsonwebtoken'
// Assuming User model import if you plan to fetch the user (recommended)

// Get the secret from environment variables

export const protect = (req, res, next) => {
    let token; 
    const KEY = process.env.JWT_SECRET

    // 1. Check if the Authorization header exists and starts with 'Bearer'
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header (split "Bearer <token>" and take the second element)
            token = req.headers.authorization.split(' ')[1].trim()
            
            // 2. Verify the token
            const decoded = jwt.verify(token, KEY);
            // Attach the decoded payload (usually contains user ID) to the request object
            req.user = decoded

            // Proceed to the next middleware or route handler
            next()
            return; // Use return to exit immediately after successful verification and next()

        } catch(error) {
            // Handle verification errors (jwt malformed, signature mismatch, expired, etc.)
            console.error(error)

            return res.status(401).json({ // Use return here to stop execution
                message: "Not authorized, token failed"
            })
        }
    }
    
    // 3. Handle case where the token is missing from the header
    // This part is executed if the initial 'if' condition failed OR if the try block failed
    // but the catch block handles the error response, so we only need to catch the missing token case.
    if (!token) {
        return res.status(401).json({
            message: "Not authorized, no token provided"
        })
    }
}