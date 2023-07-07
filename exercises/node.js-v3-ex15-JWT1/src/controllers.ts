import { Request, Response } from "express";
import joi from "joi";
import { db } from "./db.js";

const schema = joi.object({
  name: joi.string().min(3).required(),
});

const getAll = async (req: Request, res: Response) => {
  const planets = await db.many(`SELECT * FROM planets ORDER BY id;`);
  res.status(200).json(planets);
};

const getOneById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const planet = await db.oneOrNone(
    `SELECT * FROM planets WHERE id=$1;`,
    Number(id)
  );

  res.status(200).json(planet);
};

const create = async (req: Request, res: Response) => {
  const { error, value } = schema.validate(req.body);
  const { name } = req.body;

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  } else {
    await db.none(`INSERT INTO planets (name) VALUES ($1)`, name);
    res.status(201).json({ msg: "The planet was created" });
  }
};

const updateById = async (req: Request, res: Response) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { id } = req.params;
  const { name } = req.body;

  await db.none(`UPDATE planets SET name=$2 WHERE id=$1`, [id, name]);

  res.status(200).json({ msg: "The planet was updated" });
};

const deleteById = async (req: Request, res: Response) => {
  const { id } = req.params;
  await db.none(`DELETE FROM planets WHERE id=$1`, Number(id));
  res.status(200).json({ msg: "The planet was deleted" });
};

const createImage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const filename = req.file?.path;

  if (filename) {
    db.none(`UPDATE planets SET image=$2 WHERE id=$1`, [id, filename]);
    res.status(201).json({ msg: "Planet image uploaded successfully" });
  } else {
    res.status(400).json({ msg: "Planet image failed to upload" });
  }
};

export { getAll, getOneById, create, updateById, deleteById, createImage };
