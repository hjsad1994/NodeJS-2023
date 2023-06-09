import HttpStatusCode from "../exceptions/HttpStatusCode.js"
import jwt from "jsonwebtoken";
import Exception from '../exceptions/Exceptions.js';
export default function checkToken(req, res, next) { // next() is called when the request is ok
    // bypass login and register
    if (req.url.toLowerCase().trim() == '/users/login'.toLowerCase().trim()
        || req.url.toLowerCase().trim() == '/users/register'.toLowerCase().trim()) {
        next()
        return
    }
    // other requests
    const token = req.headers?.authorization?.split(" ")[1] // get token
    try {
        const jwtObject = jwt.verify(token, process.env.JWT_SECRET)
        const miliseconds = 1000;
        const isExpired = Date.now() >= jwtObject.exp * miliseconds
        if (isExpired) {
            res.status(HttpStatusCode.BAD_REQUEST).json({
                message: "Token expired"
            })
            res.end()
        }
        else {
            next()
        }
        // debugger
    } catch (exception) {
        debugger
        res.status(HttpStatusCode.BAD_REQUEST).json({
            message: exception.message
        })
    }
    // debugger
}
// import HttpStatusCode from '../exceptions/HttpStatusCode.js'
// import jwt from 'jsonwebtoken'
// export default function checkToken(req, res, next) {
//     //bypass login, register
//     if (req.url.toLowerCase().trim() == '/users/login'.toLowerCase().trim()
//         || req.url.toLowerCase().trim() == '/users/register'.toLowerCase().trim()) {
//         next()
//         return
//     }
//     //other requests
//     //get and validate token
//     const token = req.headers?.authorization?.split(" ")[1]
//     try {
//         const jwtObject = jwt.verify(token, process.env.JWT_SECRET)
//         const isExpired = Date.now() >= jwtObject.exp * 1000

//         if (isExpired) {
//             res.status(HttpStatusCode.BAD_REQUEST).json({
//                 message: 'Token is expired'
//             })
//             res.end()
//         } else {
//             next()
//             return
//         }
//     } catch (exception) {
//         res.status(HttpStatusCode.BAD_REQUEST).json({
//             message: exception.message
//         })
//     }
// }