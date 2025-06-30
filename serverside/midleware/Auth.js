import jwt, { decode } from 'jsonwebtoken'

export default function Auth(req,res,next){
    const token =req.headers['authorization']?.split(" ")[1]
    if (!token) {
        return res.status(401).json({message:"NO token provided"})
    }

    jwt.verify(token,process.env.JWT_KEY,(err,decoded)=>{
        if (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({message:"Token Expired"})
            }
            return res.status(403).json({message:"failed to authenticate token"})
        }
        req.user = decoded;//in your route handle to identify which user is making the request
        next()//is a function used to pass cotroll  from one midleweare to the next middleweare or route handle
    })
}