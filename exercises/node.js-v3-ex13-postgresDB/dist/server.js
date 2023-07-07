import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import morgan from "morgan";
import { getAll, getOneById, create, updateById, deleteById, } from "./controllers.js";
dotenv.config();
const app = express();
app.use(morgan("dev"));
app.use(express.json());
const port = process.env.PORT || 3000;
// get planets
app.get("/api/planets", getAll);
// get planet by id
app.get("/api/planets/:id", getOneById);
// post a planet
app.post("/api/planets", create);
// update a planet by id
app.put("/api/planets/:id", updateById);
app.delete("/api/planets/:id", deleteById);
//listen
app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
});
