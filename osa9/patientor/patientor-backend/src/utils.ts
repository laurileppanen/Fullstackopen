import {
  NewPatientEntry,
  Gender,
  HealthCheckRating,
  NewHospitalEntry,
  DiagnoseEntry,
  NewOccupationalHealthcareEntry,
  NewHealthCheckEntry,
  EntryWithoutId,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name");
  }

  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error("Incorrect or missing date");
  }

  return dateOfBirth;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect gender: " + gender);
  }

  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation) || !occupation) {
    throw new Error("Incorrect or missing occupation");
  }

  return occupation;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn) || !ssn) {
    throw new Error("Incorrect or missing ssn");
  }

  return ssn;
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      ssn: parseSsn(object.ssn),
      entries: [],
    };
    return newEntry;
  }

  throw new Error("Incorrect data: a field missing");
};

const parseDescription = (description: unknown): string => {
  if (!isString(description) || !description) {
    throw new Error("Incorrect or missing description");
  }

  return description;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date");
  }

  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist) || !specialist) {
    throw new Error("Incorrect or missing specialist");
  }

  return specialist;
};

const parseDiagnosisCodes = (object: unknown): Array<DiagnoseEntry["code"]> => {
  if (!object || typeof object !== "object") {
    // we will just trust the data to be in correct form
    return [] as Array<DiagnoseEntry["code"]>;
  }

  return object as Array<DiagnoseEntry["code"]>;
};

const parseDischargeDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing discharge date");
  }
  return date;
};

const parseDischargeCriteria = (criteria: unknown): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error("Incorrect or missing discharge criteria");
  }
  return criteria;
};

const parseDischarge = (
  discharge: unknown
): { date: string; criteria: string } => {
  if (
    !discharge ||
    typeof discharge !== "object" ||
    !("date" in discharge) ||
    !("criteria" in discharge)
  ) {
    throw new Error("Incorrect or missing discharge");
  }

  return {
    date: parseDischargeDate(discharge.date),
    criteria: parseDischargeCriteria(discharge.criteria),
  };
};

const parseEmployerName = (employer: unknown): string => {
  if (!isString(employer) || !employer) {
    throw new Error("Incorrect or missing employer");
  }

  return employer;
};

const parseSickLeaveDate = (date: unknown): string => {
  if (!isString(date) || !date) {
    throw new Error("Incorrect or missing Start date or End date");
  }
  return date;
};

const parseSickLeave = (
  date: unknown
): { startDate: string; endDate: string } => {
  if (
    !date ||
    typeof date !== "object" ||
    !("startDate" in date) ||
    !("endDate" in date)
  ) {
    throw new Error("Incorrect or missing starting or ending dates");
  }
  return {
    startDate: parseSickLeaveDate(date.startDate),
    endDate: parseSickLeaveDate(date.endDate),
  };
};

const parseHospitalType = (type: unknown): "Hospital" => {
  const allowedTypes = ["Hospital"];
  if (!type || typeof type !== "string" || !allowedTypes.includes(type)) {
    throw new Error("Incorrect or missing type");
  }
  return type as "Hospital";
};

const parseOccupationalHealthcareType = (
  type: unknown
): "OccupationalHealthcare" => {
  const allowedTypes = ["OccupationalHealthcare"];
  if (!type || typeof type !== "string" || !allowedTypes.includes(type)) {
    throw new Error("Incorrect or missing type");
  }
  return type as "OccupationalHealthcare";
};

const parseHealthCheckType = (type: unknown): "HealthCheck" => {
  const allowedTypes = ["HealthCheck"];
  if (!type || typeof type !== "string" || !allowedTypes.includes(type)) {
    throw new Error("Incorrect or missing type");
  }
  return type as "HealthCheck";
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  const enumNumbers = Object.keys(HealthCheckRating)
    .filter((key) => !isNaN(Number(key)))
    .map((key) => Number(key));

  return enumNumbers.includes(param);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (typeof rating !== "number" || !isHealthCheckRating(rating)) {
    throw new Error("Incorrect or missing HealthCheckRating: " + rating);
  }
  return rating;
};

export const toNewEntryForPatient = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "diagnosisCodes" in object &&
    "discharge" in object &&
    "type" in object
  ) {
    const newEntry: NewHospitalEntry = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
      discharge: parseDischarge(object.discharge),
      type: parseHospitalType(object.type),
    };
    return newEntry;
  }

  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "diagnosisCodes" in object &&
    "employerName" in object &&
    "sickLeave" in object &&
    "type" in object
  ) {
    const newEntry: NewOccupationalHealthcareEntry = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
      employerName: parseEmployerName(object.employerName),
      sickLeave: parseSickLeave(object.sickLeave),
      type: parseOccupationalHealthcareType(object.type),
    };
    return newEntry;
  }

  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "diagnosisCodes" in object &&
    "healthCheckRating" in object &&
    "type" in object
  ) {
    const newEntry: NewHealthCheckEntry = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
      healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      type: parseHealthCheckType(object.type),
    };
    return newEntry;
  }

  throw new Error("Incorrect data: a field missing");
};

export default toNewPatientEntry;
