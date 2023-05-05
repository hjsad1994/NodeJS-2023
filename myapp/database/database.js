import mongoose from 'mongoose'
import { print, OutputType } from '../helpers/print.js'
import Exception from '../exceptions/Exceptions.js'
async function connect() {
    try {
        let connect = await mongoose.connect(process.env.MONGO_URI)
        print('Connect to mongo database successfully', OutputType.SUCCESS)
        return connect
    } catch (err) {
        const { code } = err
        if (err.code == 8000) {
            throw new Exception(Exception.WRONG_DB_USERNAME_PASSWORD)
        }
        else if (code == 'ENOTFOUND') {
            throw new Exception(Exception.WRONG_CONNECTION_STRING)
        }
        throw new Exception(Exception.CANNOT_CONNECT_MONGODB)
    }
}
export default connect