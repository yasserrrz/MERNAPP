import jwt from "jsonwebtoken";


export const authorize = (req, res, next) =>{
     try {
        let token = req.header('Authorization');
        let privateKey = process.env.JWT_SECRET
        if(!token){
          return  res.status(403).send('Access Denied')
        }
        jwt.verify(token , privateKey , (error , decode)=>{
            if(error){
                return res.json({message : "token  error" , error})
            }
            next()
        })
        
     } catch (error) {
        res.status(500).json({message : "Catch Error"  , error : error.message})
     }  
}