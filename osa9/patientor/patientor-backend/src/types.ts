export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

export interface PatientEntry {
  name: string;
  ssn: string;
  occupation: string;
  dateOfBirth: string;
  gender: string;
  entries: Entry[];
  id: string;
}

export type NonSensitivePatientEntry = Omit<PatientEntry, "entries" | "ssn">;

export type NewPatientEntry = Omit<PatientEntry, "id">;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<DiagnoseEntry["code"]>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export type NewHealthCheckEntry = Omit<HealthCheckEntry, "id">;

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  };
}

export type NewHospitalEntry = Omit<HospitalEntry, "id">;

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export type NewOccupationalHealthcareEntry = Omit<
  OccupationalHealthcareEntry,
  "id"
>;

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type NewEntryForPatient = Omit<Entry, "id">;

// Define special omit for unions
export type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, "id">;
