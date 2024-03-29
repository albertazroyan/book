import JWT from "jsonwebtoken";
import createError from "http-errors";

export const verifyAccessToken =  ( (req, res, next) => {
  try {
    if (!req.headers['authorization']) return next(createError.Unauthorized())
    const authHeader = req.headers['authorization']
    const bearerToken = authHeader.split(' ')
    const token = bearerToken[1]
    
    JWT.verify(token, process.env.TOKEN_SECRET, (err, payload) => {  
      if (err) {
        const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
        return next(createError.Unauthorized(message))
      }
      req.payload = payload
      next()
    })

  } catch (errors) {
    console.log("errors")
    }
  }
)