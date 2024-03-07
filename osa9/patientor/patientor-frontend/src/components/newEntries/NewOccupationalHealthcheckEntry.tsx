import { Button } from "@mui/material";
import { useState, SyntheticEvent } from "react";
import { OccupationalHealthcareFormValues, DiagnoseEntry } from "../../types";

interface NewOccupationalHealthcareEntryProps {
  handleButtonClick: () => void;
  onSubmit: (values: OccupationalHealthcareFormValues) => void;
}

const NewOccupationalHealthcareEntry = ({
  handleButtonClick,
  onSubmit,
}: NewOccupationalHealthcareEntryProps) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<
    Array<DiagnoseEntry["code"]>
  >([]);

  const handleDiagnosisCodesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputVal = event.target.value;
    const codes = inputVal.split(",").filter((code) => code !== "");
    setDiagnosisCodes(codes);
  };

  const addOccupationalHealthcareEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    onSubmit({
      description,
      date,
      specialist,
      sickLeave: {
        startDate: startDate,
        endDate: endDate,
      },
      employerName: employerName,
      diagnosisCodes,
      type: "OccupationalHealthcare",
    });
  };

  return (
    <div className="dashed-border-box">
      <h4>New OccupationalHealthcare entry</h4>
      <form onSubmit={addOccupationalHealthcareEntry}>
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
        <div style={{ color: "#aaaaaa", marginBottom: "5px" }}>Employer</div>
        <input
          className="input-underline"
          type="text"
          onChange={({ target }) => setEmployerName(target.value)}
        />
        <div style={{ color: "#aaaaaa", marginBottom: "5px" }}>Start date</div>
        <input
          className="input-underline"
          type="text"
          onChange={({ target }) => setStartDate(target.value)}
        />
        <div style={{ color: "#aaaaaa", marginBottom: "5px" }}>End date</div>
        <input
          className="input-underline"
          type="text"
          onChange={({ target }) => setEndDate(target.value)}
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

export default NewOccupationalHealthcareEntry;
