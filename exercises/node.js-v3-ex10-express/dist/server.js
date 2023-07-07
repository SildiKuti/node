import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import morgan from "morgan";
dotenv.config();
let planets = [
    {
        id: 1,
        name: "Earth",
    },
    {
        id: 2,
        name: "Mars",
    },
];
const app = express();
app.use(morgan("dev"));
app.use(express.json());
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
});
// app.get("/", (req, res) => {
//   res.status(200).json({ msg: "Gato nero"})
// })
