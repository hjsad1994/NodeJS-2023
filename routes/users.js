import express from 'express';
const router = express.Router();
import { body, validationResult } from 'express-validator';
import {
    userController,
    studentController
} from "../controllers/index.js"
import user from '../controllers/user.js';
router.get('/:id', userController.getDetailuser)
router.post('/login',
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    userController.login
)
router.post('/register', userController.register)
export default router
