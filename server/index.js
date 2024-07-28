import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import dBconnection from './DB/connection.js'
import { register } from "./controllers/auth.js";
import authRoute from "./routes/auth.routes.js"
import usersRouter from './routes/users.routes.js'
import { authorize } from "./middleware/auth.middleware.js";
import { addPost } from "./controllers/post.js";
import postRouter from "./routes/post.routes.js"

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

app.use('/uploads', express.static('uploads'));
/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

app.use('/auth', authRoute);
app.use("/users" , usersRouter)
app.use('/post' , postRouter)
app.post('/auth/register', upload.single('picture'), register)
app.post('/post', authorize  , upload.single('image') , addPost )


dBconnection()
const port = process.env.PORT || 6001;
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`))