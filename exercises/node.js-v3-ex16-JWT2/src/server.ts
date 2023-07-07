import express from "express";
import morgan from "morgan";
import "express-async-errors";
import "dotenv/config";
import {
  getAll,
  getOneById,
  create,
  updateById,
  deleteByID,
  createImage,
} from "./controllers/planets.js";
import { logIn, singUp } from "./controllers/users.js";
import multer from "multer";

const app = express();
const port = process.env.PORT;
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

app.use("/uploads", express.static("uploads"));

app.use(morgan("dev"));
app.use(express.json());

app.get("/api/planets", getAll);

app.get("/api/planets/:id", getOneById);

app.post("/api/planets", create);

app.put("/api/planets/:id", updateById);

app.delete("/api/planets/:id", deleteByID);

app.post("/api/planets/:id/image", upload.single("image"), createImage);

app.post("/api/users/login", logIn);
app.post("/api/users/singup", singUp);

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
