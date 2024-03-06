import express from "express";
import patientService from "../services/patientService";

import toNewPatientEntry, { toNewEntryForPatient } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get("/:id", (_req, res) => {
  res.send(patientService.getPatientEntry(_req.params.id));
});

router.get("/:id/entries", (_req, res) => {
  res.send(patientService.getExactPatientsEntry(_req.params.id));
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error; " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const newEntryForPatient = toNewEntryForPatient(req.body);
    const id = req.params.id;
    const addedEntry = patientService.addEntryForPatient(
      newEntryForPatient,
      id
    );
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
