import HttpStatusCode from "../exceptions/HttpStatusCode.js"
import { studentRepository } from "../repositories/index.js"
import Exception from '../exceptions/Exceptions.js';
async function getAllStudent(req, res) {
    res.status(HttpStatusCode.OK).json({
        message: "get students successfully",
        data: [
            {
                name: "tran tan tai",
                email: "trantai306@gmail.com",
                age: "22"
            },
            {
                name: "test",
                email: "test@gmail.com",
                age: "23"
            },
            {
                name: "aaaa",
                email: "aaa@gmail.com",
                age: "37"
            },
        ]
    })
    // check if cannot get
    // res.status(500).json({message: "error: cannot get all students"})
}
async function getStudentById(req, res) {
}
async function updateStudent(req, res) {

}
async function insertStudent(req, res) {
    try {
        const student = await studentRepository.insertStudent(req.body)
        res.status(HttpStatusCode.INSERT_OK).json({
            message: "insert student successfully",
            data: student
        })
        debugger

    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: "cannot insert student" + exception,
            validationErrors: exception.validationErrors
        })
        debugger
    }
}
async function generateFakeStudents(req, res) {
    await studentRepository.generateFakeStudents(req.body)
    res.status(HttpStatusCode.INSERT_OK).json({
        message: "insert student successfully",
    })
    debugger

}
export default {
    getAllStudent,
    getStudentById,
    updateStudent,
    insertStudent,
    generateFakeStudents
}