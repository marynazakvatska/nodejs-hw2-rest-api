const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const multer = require("multer")
const path = require("path")
const {v4} = require("uuid")

const tempDir = path.join(__dirname, "temp")
console.log(tempDir)

const uploadConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
  limits: {
    fileSize: 2048
  }
})


const uploadMiddleWare = multer({
  storage: uploadConfig
})

const app = express();

/* app.use(logger(formatsLogger)) */
app.use(cors())
app.use(express.json())

const avatars = []

app.post("/api/avatars", uploadMiddleWare.single("image"), async(req, res) => {
  console.log(req.body);
  console.log(req.file)
  const newAvatar = { ...req.body, id: v4() };
  avatars.push(newAvatar);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result
    }
  })
  
})

app.listen(3000)

const contactsRouter = require('./routes/api/contacts');
const authRouter = require("./routes/api/users")
// const ordersRouter = require("./routes/api/owners")

app.use(logger(formatsLogger))
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'



/* app.use("api/v1/auth", authRouter) */
app.use("/api/users", authRouter)
// app.use("/api/owners", ordersRouter)
app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: 'Not found'
  })
})

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({
    status: "error",
    code: status,
    message: "jhhf"
  })
})

module.exports = app
