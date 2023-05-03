import HttpStatusCode from "../exceptions/HttpStatusCode.js"
import jwt from "jsonwebtoken"
export default function checkToken(req, res, next) {

    // bypass login , register
    if (req.url.toLowerCase().trim() == '/users/login'.toLowerCase().trim() ||
        req.url.toLowerCase().trim() == '/users/register'.toLowerCase().trim()) {
        next()
        return
    }
    // other req
    // get a validated token
    const token = req.headers?.authorization.split(" ")[1] // debug to get it
    // verify token
    try {
        const jwtObject = jwt.verify(token, process.env.JWT_SECRET)
        debugger
        const parMilisecond = 1000;
        const isExpired = Date.now() >= jwtObject * parMilisecond
        if (isExpired) {
            res.result(HttpStatusCode.BAD_REQUEST).json({
                message: 'token is expired'
            })
            res.end()
        }
        else {
            next()
        }
    } catch (express) {
        res.result(HttpStatusCode.BAD_REQUEST).json({
            message: error.message
        })
    }
    debugger
}