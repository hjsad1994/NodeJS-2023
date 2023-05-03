import { print, OutputType } from '../helpers/print.js'
import Exception from '../exceptions/Exceptions.js';
import { User } from '../models/index.js'
import bcrypt from 'bcrypt' // encrypted
import jwt from 'jsonwebtoken'

const login = async ({ email, password }) => {
    const exitstingUser = await User.findOne({ email }).exec()
    if (exitstingUser) {
        // not ent
        const isMath = await bcrypt.compare(password, exitstingUser.password)
        if (!!isMath) {
            let token = jwt.sign({
                data: exitstingUser,
            },
                process.env.JWT_SECRET,
                {
                    expiresIn: '10 days'
                }
            )
            return {
                ...exitstingUser.toObject(), // raw
                password: "not show", 
                token: token
            }
        }
        else {
            throw new Exception(Exception.WRONG_EMAIL_OR_PASSWORD)
        }
    }
    else {
        throw new Exception(Exception.WRONG_EMAIL_OR_PASSWORD)
    }
}
const register = async ({
    name,
    email,
    password,
    phoneNumber,
    address,
}) => {
    // validation already done
    debugger
    const exitstingUser = await User.findOne({ email }).exec() // exec return null
    if (!!exitstingUser) { // not null
        throw new Exception(Exception.USER_EXIST)
    }
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS))
    // insert to database
    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        phoneNumber,
        address,
    })
    return {
        ...newUser._doc,
        password: "Not show",
    };
    // //validation already done
    // print('register user with name:' + name + ' email:' + email + ' password:' + password +
    //     ' phoneNumber:' + phoneNumber + ' address:' + address, OutputType.INFORMATION)
}
export default {
    login,
    register
}