import axios from "axios";
import {
  Patient,
  PatientFormValues,
  HealthCheckFormValues,
  HealthCheckEntry,
  HospitalEntry,
  HospitalFormValues,
  OccupationalHealthcareFormValues,
  OccupationalHealthcareEntry,
} from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const getById = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const createHealthCheckEntry = async (
  object: HealthCheckFormValues,
  id: string
) => {
  const { data } = await axios.post<HealthCheckEntry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    object
  );

  return data;
};

const createHospitalEntry = async (object: HospitalFormValues, id: string) => {
  const { data } = await axios.post<HospitalEntry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    object
  );

  return data;
};

const createOccupationalHealthcareEntry = async (
  object: OccupationalHealthcareFormValues,
  id: string
) => {
  const { data } = await axios.post<OccupationalHealthcareEntry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    object
  );

  return data;
};

export default {
  getAll,
  create,
  getById,
  createHealthCheckEntry,
  createHospitalEntry,
  createOccupationalHealthcareEntry,
};
