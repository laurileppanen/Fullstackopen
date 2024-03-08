import { SyntheticEvent, useEffect, useState } from "react";
import { DiagnoseEntry, HealthCheckFormValues } from "../../types";
import { Button } from "@mui/material";
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
  const [availableDiagnoses, setAvailableDiagnoses] = useState<DiagnoseEntry[]>(
    []
  );
  const [diagnosisCodes, setDiagnosisCodes] = useState<
    Array<DiagnoseEntry["code"]>
  >([]);

  const handleHealthCheckRatingChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    const number = parseInt(value, 10);

    if (!isNaN(number)) {
      setHealthCheckRating(number);
    } else {
      setHealthCheckRating(-1);
    }
  };

  useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/api/diagnoses");
        setAvailableDiagnoses(data);
      } catch (error) {
        console.error("Error fetching diagnoses: ", error);
      }
    };

    fetchDiagnoses();
  }, []);

  const handleDiagnosisCodesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputVal = event.target.value;
    const codes = inputVal.split(",").filter((code) => code !== "");
    setDiagnosisCodes(codes);
  };

  const handleDiagnosisSelection = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value;
    if (!diagnosisCodes.includes(selectedValue)) {
      setDiagnosisCodes([...diagnosisCodes, selectedValue]);
    }
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
          type="date"
          onChange={({ target }) => setDate(target.value)}
        />
        <div style={{ color: "#aaaaaa", marginBottom: "5px" }}>Specialist</div>
        <input
          className="input-underline"
          type="text"
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <div style={{ color: "#aaaaaa", marginBottom: "5px" }}>
          healthcheck rating
        </div>
        <select
          className="input-underline"
          value={healthCheckRating !== -1 ? healthCheckRating.toString() : ""}
          onChange={handleHealthCheckRatingChange}
        >
          <option value="" disabled>
            Select rating
          </option>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>

        <div style={{ color: "#aaaaaa", marginBottom: "5px" }}>
          Diagnosis codes
        </div>
        <select onChange={handleDiagnosisSelection} value="">
          <option value="" disabled>
            Select diagnoses
          </option>
          {availableDiagnoses.map((diagnosis) => (
            <option key={diagnosis.code} value={diagnosis.code}>
              {diagnosis.code}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={diagnosisCodes.join(",")}
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

export default NewHealthCheckEntry;
