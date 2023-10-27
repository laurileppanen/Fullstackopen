import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get(`/bmi`, (_req, res) => {
  const height = Number(_req.query.height);
  const weight = Number(_req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: "malformatted parameters" });
  } else {
    const bmi = calculateBmi(height, weight);
    res.json({ weight, height, bmi });
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { period, target } = req.body;

  if (!period || !target) {
    res.status(400).send({ error: "parameters missing" });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (isNaN(target)) {
    res.status(400).send({ error: "malformatted parameters" });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  if (period.some((value: number) => isNaN(value))) {
    res.status(400).send({ error: "malformatted parameters" });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(period, target);

  res.send({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
