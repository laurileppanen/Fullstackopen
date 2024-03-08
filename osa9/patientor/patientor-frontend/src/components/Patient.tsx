import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import patientService from "../services/patients";
import NewHealthCheckEntry from "./newEntries/NewHealthCheckEntry";
import NewHospitalEntry from "./newEntries/NewHospitalEntry";
import NewOccupationalHealthcareEntry from "./newEntries/NewOccupationalHealthcheckEntry";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import EntryDetails from "./EntryDetails";
import {
  Entry,
  HealthCheckFormValues,
  HospitalFormValues,
  OccupationalHealthcareFormValues,
} from "../types";
import { Patient } from "../types";
import { Alert, Button } from "@mui/material";

import "./patient.css";
import axios from "axios";

const PatientDetails = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const { id } = useParams<{ id: string }>();
  const [HealthCheckForm, setHealthCheckForm] = useState(false);
  const [HospitalForm, setHospitalForm] = useState(false);
  const [OccupationalHealthcareForm, setOccupationalHealthcareForm] =
    useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchPatientDetails = async () => {
        const patientData = await patientService.getById(id);
        setPatient(patientData);
      };
      fetchPatientDetails();
    }
  }, [id]);

  if (!patient) {
    return <div>Loading...</div>;
  }

  const handleHealthCheckClick = () => {
    setHealthCheckForm((currentShowForm) => !currentShowForm);
    setHospitalForm(false);
    setOccupationalHealthcareForm(false);
  };

  const handleHospitalClick = () => {
    setHospitalForm((currentShowForm) => !currentShowForm);
    setHealthCheckForm(false);
    setOccupationalHealthcareForm(false);
  };

  const handleOccupationalHealthcareClick = () => {
    setOccupationalHealthcareForm((currentShowForm) => !currentShowForm);
    setHealthCheckForm(false);
    setHospitalForm(false);
  };

  const submitNewHealthCheckEntry = async (values: HealthCheckFormValues) => {
    if (!id) {
      console.error("ID is undefined");
      return;
    }

    try {
      const entry = await patientService.createHealthCheckEntry(values, id);
      if (patient && patient.entries) {
        setPatient({
          ...patient,
          entries: patient.entries.concat(entry),
        });
        setErrorMessage(null);
      }
    } catch (error) {
      console.error("Error adding new healthcheck entry:", error);
      if (axios.isAxiosError(error) && error.response) {
        console.error("Error response data:", error.response.data);
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage("Failed to add new entry. An unknown error occurred.");
      }
    }
  };

  const submitNewHospitalEntry = async (values: HospitalFormValues) => {
    if (!id) {
      console.error("ID is undefined");
      return;
    }

    try {
      const entry = await patientService.createHospitalEntry(values, id);
      if (patient && patient.entries) {
        setPatient({
          ...patient,
          entries: patient.entries.concat(entry),
        });
        setErrorMessage(null);
      }
    } catch (error) {
      console.error("Error adding new hospital entry:", error);
      if (axios.isAxiosError(error) && error.response) {
        console.error("Error response data:", error.response.data);
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage("Failed to add new entry. An unknown error occurred.");
      }
    }
  };

  const submitNewOccupationalHealthcareEntry = async (
    values: OccupationalHealthcareFormValues
  ) => {
    if (!id) {
      console.error("ID is undefined");
      return;
    }

    try {
      const entry = await patientService.createOccupationalHealthcareEntry(
        values,
        id
      );
      if (patient && patient.entries) {
        setPatient({
          ...patient,
          entries: patient.entries.concat(entry),
        });
        setErrorMessage(null);
      }
    } catch (error) {
      console.error("Error adding new hospital entry:", error);
      if (axios.isAxiosError(error) && error.response) {
        console.error("Error response data:", error.response.data);
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage("Failed to add new entry. An unknown error occurred.");
      }
    }
  };

  interface ErrorMessageProps {
    message: string;
  }

  const ErrorMessage = ({ message }: ErrorMessageProps) => {
    if (!message) return null;

    return (
      <div>
        <Alert severity="error">{message}</Alert>
      </div>
    );
  };

  return (
    <div>
      <h2>
        {patient.name}
        {patient.gender === "male" && <MaleIcon />}
        {patient.gender === "female" && <FemaleIcon />}
      </h2>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {HealthCheckForm && (
        <NewHealthCheckEntry
          handleButtonClick={handleHealthCheckClick}
          onSubmit={submitNewHealthCheckEntry}
        />
      )}
      {HospitalForm && (
        <NewHospitalEntry
          handleButtonClick={handleHospitalClick}
          onSubmit={submitNewHospitalEntry}
        />
      )}
      {OccupationalHealthcareForm && (
        <NewOccupationalHealthcareEntry
          handleButtonClick={handleOccupationalHealthcareClick}
          onSubmit={submitNewOccupationalHealthcareEntry}
        />
      )}
      <h3>entries</h3>
      {patient.entries.map((entry: Entry, index: number) => (
        <div
          key={index}
          style={{
            border: "1px solid black",
            padding: "10px",
            margin: "10px 0",
            borderRadius: "5px",
          }}
        >
          <EntryDetails key={index} entry={entry} />
        </div>
      ))}
      <Button
        variant="contained"
        color="primary"
        onClick={handleHealthCheckClick}
      >
        Add new HealthCheck entry
      </Button>{" "}
      <Button variant="contained" color="primary" onClick={handleHospitalClick}>
        Add new Hospital entry
      </Button>{" "}
      <Button
        variant="contained"
        color="primary"
        onClick={handleOccupationalHealthcareClick}
      >
        Add new OccupationalHealthcare entry
      </Button>
    </div>
  );
};

export default PatientDetails;
