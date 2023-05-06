import express from 'express';
import {
    studentController
} from "../controllers/index.js"
const router = express.Router();
router.get('/', studentController.getAllStudent)
router.get('/:id', studentController.getStudentById)
router.patch('/', studentController.updateStudent)
router.post('/insert', studentController.insertStudent)
// router.post('/insertFakeStudent', studentController.generateFakeStudents) // should be pivated
export default router