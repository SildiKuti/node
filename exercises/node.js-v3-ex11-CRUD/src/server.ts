import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import morgan from "morgan";
import joi from "joi";

dotenv.config();

type Planet = {
  id: number;
  name: string;
};

type Planets = Planet[];

let planets: Planets = [
  {
    id: 1,
    name: "Earth",
  },
  {
    id: 2,
    name: "Mars",
  },
];

const planetSchema = joi.object({
  id: joi.number().integer().required(),
  name: joi.string().required()
})

const app = express();

app.use(morgan("dev"));
app.use(express.json());

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});

// get planets

app.get("/api/planets", (req, res) => {
  res.status(200).json(planets);
});

// get planet by id

app.get("/api/planets/:id", (req, res) => {
  const { id } = req.params;
  const planet = planets.find((p) => p.id === Number(id));
  res.status(200).json(planet);
});

// post a planet

app.post("/api/planets", (req, res) => {
  const { id, name } = req.body;
  const newPlanet = { id, name };
  const validatedNewPlanet = planetSchema.validate(newPlanet);

  if (validatedNewPlanet.error) {
    return res.status(400).json({ msg: validatedNewPlanet.error.details[0].message });
  } else {
    planets = [...planets, newPlanet];
    res.status(201).json({ msg: "The planet was created." });
  }
});

// update a planet by id

app.put("/api/planets/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  planets = planets.map(p => p.id === Number(id) ? ({ ...p, name}) : p);

  console.log(planets);

  res.status(200).json({ msg: "The planet was updated"})
})

app.delete("/api/planets/:id", (req, res) => {
  const { id } = req.params;
  planets = planets.filter(p => p.id !== Number(id));

  res.status(200).json({ msg: "The planet was deleted"});
})
