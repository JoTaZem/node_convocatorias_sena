import jwt from "jsonwebtoken"

const authMiddleware = (req,res,next) => {
    const token = req.header("Authorization")
    if(!token) 
        return res.status(401).send("Acceso denegado")
    try {
        const verified = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET)
        req.user = verified
        next()
    } catch (err) {
        res.status(400).send(" Token Valido") 
    }
}

export default authMiddleware