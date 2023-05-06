// Import necessary libraries and modules
import { body, validationResult } from 'express-validator';
import { studentRepository, userRepository } from '../repositories/index.js';
import eventEmitter from 'events'; // used for listening to an event, using a function to catch this event
import HttpStatusCode from '../exceptions/HttpStatusCode.js';
import Exception from '../exceptions/Exceptions.js';
import  express from 'express';
// Create a new eventEmitter object
const myEvent = new eventEmitter();
// Add a listener to the eventEmitter to listen to the 'event.register.user' event
myEvent.on('event.register.user', (params) => {
    console.log(`they talked about: ${JSON.stringify(params)}`)
})

// Define the function to handle login requests
const login = async (req, res) => {
    // Check for errors
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ error: error.array() });
    }

    // Get the email and password information from the request body
    const { email, password } = req.body;

    // Call the repository to perform login
    try {
        let exitstingUser = await userRepository.login({ email, password });
        res.status(HttpStatusCode.OK).json({
            message: 'Login successful',
            data: exitstingUser, // detail user
        });        
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.toString(),
        })
    }
}

// const login = async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(HttpStatusCode.BAD_REQUEST).json({
//             errors: errors.array()
//         });
//     }
//     const { email, password } = req.body;
//     //call repository
//     try {
//         const existingUser = await userRepository.login({ email, password })
//         res.status(HttpStatusCode.OK).json({
//             message: 'Login user successfully',
//             data: existingUser
//         })
//     } catch (exception) {
//         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
//             message: exception.toString(),
//         })
//     }
// }
// Define the function to handle register requests
const register = async (req, res) => {
    //destructuring
    const {
        name,
        email,
        password,
        phoneNumber,
        address
    } = req.body

    //Event Emitter
    myEvent.emit('event.register.user', { email, phoneNumber })
    try {
        debugger
        const user = await userRepository.register({
            name,
            email,
            password,
            phoneNumber,
            address
        })
        res.status(HttpStatusCode.INSERT_OK).json({
            message: 'Register user successfully',
            data: user
        })
    } catch (exception) {
        debugger
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.toString(),
        })
    }

}
// Define the function to handle getting user information requests
const getDetailuser = async (req, res) => {
    // TODO: Update later
}

// Export the handling functions for use in the routes
export default {
    login,
    register,
    getDetailuser
}
