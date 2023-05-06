import Exception from '../exceptions/Exceptions.js'
import { Student } from '../models/index.js'
import { faker } from '@faker-js/faker';
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
async function generateFakeStudents() {
    let fakeStudents = []
    for (let i = 0; i < 500; i++) {
        let fakestudent = {
            name: `${faker.internet.userName() + '-faker'}`,
            email: faker.internet.email(),
            languages: [faker.helpers.arrayElement(['Japanese', 'English', 'Vietnamese']),
            faker.helpers.arrayElement(['Chinese', 'French', 'Vietnamese']) // array
            ],
            gender: faker.helpers.arrayElement(['Male', 'Female']),
            phoneNumber: faker.phone.number(),
            address: faker.address.city()
        }
        fakeStudents.push(fakestudent)
    }
    await Student.insertMany(fakeStudents)
}
export default {
    getAllStudents,
    insertStudent,
    generateFakeStudents
} 