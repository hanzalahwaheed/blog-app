import express from "express"
import postRoutes from "./routes/postsRoute.js"
import authRoutes from "./routes/authRoute.js"
import userRoutes from "./routes/usersRoute.js"
import cookieParser from "cookie-parser"
import multer from "multer"

const app = express()
app.use(express.json())
app.use(cookieParser())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/upload')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage: storage })

// const upload = multer({ dest: './uploads/' })
app.post('/api/upload', upload.single('file'), function (req, res) {
    const file = req.file;
    try {
        res.status(200).json(file);
    } catch (error) {
        res.json(error)
    }
})

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/posts", postRoutes)

app.listen(8800, () => {
    console.log("Backend Initialised on port :", 8800);
})