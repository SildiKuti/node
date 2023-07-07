var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import joi from "joi";
import pgPromise from "pg-promise";
const db = pgPromise()("postgres://postgres:postgres@localhost:5432/postgres");
const setupDb = () => __awaiter(void 0, void 0, void 0, function* () {
    yield db.none(`
        DROP TABLE IF EXISTS planets;

        CREATE TABLE planets (
            id SERIAL NOT NULL PRIMARY KEY,
            name TEXT NOT NULL
        );
    `);
    yield db.none(`INSERT INTO planets (name) VALUES ('Earth')`);
    yield db.none(`INSERT INTO planets (name) VALUES ('Mars')`);
});
setupDb();
const schema = joi.object({
    name: joi.string().min(3).required(),
});
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const planets = yield db.many(`SELECT * FROM planets ORDER BY id;`);
    res.status(200).json(planets);
});
const getOneById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const planet = yield db.oneOrNone(`SELECT * FROM planets WHERE id=$1;`, Number(id));
    res.status(200).json(planet);
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = schema.validate(req.body);
    const { name } = req.body;
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    else {
        yield db.none(`INSERT INTO planets (name) VALUES ($1)`, name);
        res.status(201).json({ msg: "The planet was created" });
    }
});
const updateById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    const { id } = req.params;
    const { name } = req.body;
    yield db.none(`UPDATE planets SET name=$2 WHERE id=$1`, [id, name]);
    res.status(200).json({ msg: "The planet was updated" });
});
const deleteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield db.none(`DELETE FROM planets WHERE id=$1`, Number(id));
    res.status(200).json({ msg: "The planet was deleted" });
});
export { getAll, getOneById, create, updateById, deleteById };
