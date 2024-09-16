import express from "express";
// import { PORT, mongoDBURL } from "./config.js";
import {PORT} from "./config.js";
import path from 'path';
import { fileURLToPath } from 'url';
// import mongoose from "mongoose";
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(__dirname));
app.get('/', (req, res) => {
    // console.log(req);
    // res.send("Hi");
    res.sendFile(path.join(__dirname, 'syllabus_render.html'));
});

 app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
 })

// mongoose.connect(mongoDBURL)
//     .then(() => {
//         console.log("Connected to database");
//         app.listen(PORT, () => {
//             console.log(`Server listening on PORT ${PORT}`);
//         })
//     })
//     .catch((error) => {
//         console.log(error);
//     })