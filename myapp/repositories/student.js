import Exception from '../exceptions/Exceptions.js'
import { Student } from '../models/index.js'
const getAllStudents = async ({
    page,
    size,
    searchString,

}) => {
    console.log('get all student with paping')
}
const insertStudent = async ({
    name,
    email,
    languages,
    gender,
    phoneNumber,
    address
}) => {
    // const exitstingUser = await Student.findOne({ email }).exec() // exec return null
    // if (!!exitstingUser) { // not null
    //     throw new Exception(Exception.USER_EXIST)
    // }
    // else {
    try {
        debugger
        const student = await Student.create({
            name,
            email,
            languages,
            gender,
            phoneNumber,
            address
        })
        return student
    } catch (exception) {
        if (!!exception.errors) {
            // error from validaton
            debugger
            throw new Exception("input error", exception.errors)
        }
    }
    // }

}
// const insertStudent = async ({
//     name,
//     email,
//     languages,
//     gender,
//     phoneNumber,
//     address
// }) => {
//     //console.log('insert student')
//     try {
//         debugger
//         const student = await Student.create({
//             name,
//             email,
//             languages,
//             gender,
//             phoneNumber,
//             address
//         })
//         return student
//     } catch (exception) {
//         if (!!exception.errors) {
//             //error from validations
//             throw new Exception('Input error', exception.errors)
//         }
//         debugger
//     }
//     debugger
// }
export default {
    getAllStudents,
    insertStudent
} 