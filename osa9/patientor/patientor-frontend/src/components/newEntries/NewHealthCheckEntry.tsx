import { SyntheticEvent, useState } from "react";
import { DiagnoseEntry, HealthCheckFormValues } from "../../types";
import { Button } from "@mui/material";

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

export default NewHealthCheckEntry;
