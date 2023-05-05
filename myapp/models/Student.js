import mongoose from 'mongoose'
import { Schema, ObjectId } from "mongoose";
import isEmail from 'validator/lib/isEmail.js'
const Student = mongoose.model('Student',
    new Schema({
        id: { type: ObjectId },
        name: {
            type: String,
            required: true,
            validate: {
                validator: (value) => value.length > 3,
                message: 'Please enter at least 3'
            }
        },
        email: {
            type: String,
            required: true,
            validate: {
                validator: (value) => isEmail,
                message: 'Please enter a valid email address'
            }
        },
        languages: {
            type: [String],
        },
        gender: {
            type: String,
            enum: {
                values: ['Male', 'Female'],
                message: '{VALUE} is not supported'
            },
            required: true
        },
        phoneNumber: {
            type: String,
            required: true,
            validate: (value) => value.length > 5 &&
             value.length <= 20,
            message: 'Please enter at least 5 digits'
        },
        address: {
            type: String,
            required: false
        },
    }))
export default Student