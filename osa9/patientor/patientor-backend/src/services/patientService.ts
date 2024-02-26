import patients from "../../data/newPatients";
import {
  PatientEntry,
  NonSensitivePatientEntry,
  NewPatientEntry,
  Entry,
  EntryWithoutId,
} from "../types";

import { v1 as uuid } from "uuid";

const getEntries = (): PatientEntry[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatientEntry = (id: string): PatientEntry | undefined => {
  return patients.find((patient) => patient.id === id);
};

const getExactPatientsEntry = (id: string): Entry[] | undefined => {
  return patients.find((patient) => patient.id === id)?.entries;
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntryForPatient = (
  entry: EntryWithoutId,
  id: string
): Entry | undefined => {
  const patient = patients.find((p) => p.id === id);

  if (!patient) {
    return undefined;
  }

  const newEntry: Entry = {
    ...entry,
    id: uuid(),
  };

  patient.entries.push(newEntry);

  return newEntry;
};

export default {
  getEntries,
  addPatient,
  getNonSensitiveEntries,
  getPatientEntry,
  getExactPatientsEntry,
  addEntryForPatient,
};
