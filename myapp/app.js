import express from 'express'
const app = express();
import { usersRouter, studentsRouter } from './routes/index.js'
import * as dotenv from 'dotenv'
dotenv.config()
import connect from './database/database.js'
import checkToken from './authenication/auth.js';

// Cấu hình middleware để sử dụng JSON parser cho các request body
app.use(checkToken) // shiled , guard
app.use(express.json())
// Thiết lập cổng để server lắng nghe các kết nối
const port = process.env.PORT ?? 3000

// Sử dụng các router xử lý các endpoint '/users' và '/students'
app.use('/users', usersRouter)
app.use('/students', studentsRouter)

// Thiết lập endpoint mặc định trả về chuỗi 'hello nodejs' khi được truy cập
app.get('/', (req, res) => {
  res.send("hello nodejs")
});

// Khởi động server và lắng nghe các kết nối trên cổng được chỉ định, in ra log khi server bắt đầu lắng nghe
app.listen(port, async () => {
  await connect()
  console.log(`Server listening on port ${port}`)
});
