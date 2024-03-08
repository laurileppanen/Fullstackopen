import { Button } from "@mui/material";
import { useState, SyntheticEvent, useEffect } from "react";
import { OccupationalHealthcareFormValues, DiagnoseEntry } from "../../types";
import axios from "axios";

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
  const [availableDiagnoses, setAvailableDiagnoses] = useState<DiagnoseEntry[]>(
    []
  );
  const [diagnosisCodes, setDiagnosisCodes] = useState<
    Array<DiagnoseEntry["code"]>
  >([]);

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
          type="date"
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
          type="date"
          onChange={({ target }) => setStartDate(target.value)}
        />
        <div style={{ color: "#aaaaaa", marginBottom: "5px" }}>End date</div>
        <input
          className="input-underline"
          type="date"
          onChange={({ target }) => setEndDate(target.value)}
        />
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

export default NewOccupationalHealthcareEntry;
