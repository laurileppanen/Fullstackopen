import { useParams } from "react-router-dom";
import { SyntheticEvent, useEffect, useState } from "react";
import patientService from "../services/patients";

import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import EntryDetails from "./EntryDetails";
import { DiagnoseEntry, Entry, HealthCheckFormValues } from "../types";
import { Patient } from "../types";
import { Button } from "@mui/material";

import "./patient.css";
import axios from "axios";

interface NewHealthCheckEntryProps {
  handleButtonClick: () => void;
  onSubmit: (values: HealthCheckFormValues) => void;
}

const NewHealthCheckEntry = ({
  handleButtonClick,
  onSubmit,
}: NewHealthCheckEntryProps) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState(-1);
  const [diagnosisCodes, setDiagnosisCodes] = useState<
    Array<DiagnoseEntry["code"]>
  >([]);

  const handleHealthCheckRatingChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    const number = parseInt(value, 10);

    if (!isNaN(number)) {
      setHealthCheckRating(number);
    } else {
      setHealthCheckRating(-1);
    }
  };

  const handleDiagnosisCodesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputVal = event.target.value;
    const codes = inputVal.split(",").filter((code) => code !== "");
    console.log("moi", codes);
    setDiagnosisCodes(codes);
  };

  const addHealthCheckEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    onSubmit({
      description,
      date,
      specialist,
      healthCheckRating,
      diagnosisCodes,
      type: "HealthCheck",
    });
  };

  return (
    <div className="dashed-border-box">
      <h4>New HealthCheck entry</h4>
      <form onSubmit={addHealthCheckEntry}>
        <div style={{ color: "#aaaaaa", marginBottom: "5px" }}>Description</div>
        <input
          className="input-underline"
          type="text"
          onChange={({ target }) => setDescription(target.value)}
        />
        <div style={{ color: "#aaaaaa", marginBottom: "5px" }}>Date</div>
        <input
          className="input-underline"
          type="text"
          onChange={({ target }) => setDate(target.value)}
        />
        <div style={{ color: "#aaaaaa", marginBottom: "5px" }}>Specialist</div>
        <input
          className="input-underline"
          type="text"
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <div style={{ color: "#aaaaaa", marginBottom: "5px" }}>
          Healthcheck rating
        </div>
        <input
          className="input-underline"
          type="text"
          onChange={handleHealthCheckRatingChange}
        />
        <div style={{ color: "#aaaaaa", marginBottom: "5px" }}>
          Diagnosis codes
        </div>
        <input
          className="input-underline"
          type="text"
          onChange={handleDiagnosisCodesChange}
        />
        <div className="button-container">
          <Button
            variant="contained"
            style={{ backgroundColor: "red", color: "white" }}
            onClick={handleButtonClick}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: "#cccccc", color: "black" }}
            type="submit"
          >
            Add
          </Button>
        </div>
      </form>
    </div>
  );
};

const PatientDetails = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const { id } = useParams<{ id: string }>();
  const [showForm, setShowForm] = useState(false);
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

  const handleButtonClick = () => {
    setShowForm((currentShowForm) => !currentShowForm);
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

  interface ErrorMessageProps {
    message: string;
  }

  const ErrorMessage = ({ message }: ErrorMessageProps) => {
    if (!message) return null;

    return (
      <div
        style={{
          color: "black",
          backgroundColor: "#ffe4e9",
          padding: "10px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <span
          style={{
            marginRight: "10px",
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            backgroundColor: "black",
            color: "white",
            fontSize: "16px",
          }}
        >
          !
        </span>
        {message}
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

      {showForm && (
        <NewHealthCheckEntry
          handleButtonClick={handleButtonClick}
          onSubmit={submitNewHealthCheckEntry}
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
      <Button variant="contained" color="primary" onClick={handleButtonClick}>
        Add new entry
      </Button>
    </div>
  );
};

export default PatientDetails;
