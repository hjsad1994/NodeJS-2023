import { print, OutputType } from '../helpers/print.js'
export default class Exception extends Error {
    static WRONG_DB_USERNAME_PASSWORD = "Wrong database's username and password"
    static WRONG_CONNECTION_STRING = "Wrong server name/connection string"
    static CANNOT_CONNECT_MONGODB = "Can't connect to mongo database"
    static USER_EXIST = "User already exists"
    static CANNOT_REGISTER_USER = "Can't register user"
    static WRONG_EMAIL_OR_PASSWORD = "Wrong email or password"
    static CANNOT_INSERT_STUDENT = ''
    constructor(message, validationErrors) {
        super(message)
        print(message, OutputType.ERROR)
        this.validationErrors = validationErrors
    }
}