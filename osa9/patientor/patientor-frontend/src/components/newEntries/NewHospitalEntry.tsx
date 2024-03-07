import { SyntheticEvent, useState } from "react";
import { DiagnoseEntry, HospitalFormValues } from "../../types";
import { Button } from "@mui/material";

interface NewHospitalEntryProps {
  handleButtonClick: () => void;
  onSubmit: (values: HospitalFormValues) => void;
}

const NewHospitalEntry = ({
  handleButtonClick,
  onSubmit,
}: NewHospitalEntryProps) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
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

  const addHospitalEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    onSubmit({
      description,
      date,
      specialist,
      discharge: {
        date: dischargeDate,
        criteria: dischargeCriteria,
      },
      diagnosisCodes,
      type: "Hospital",
    });
  };

  return (
    <div className="dashed-border-box">
      <h4>New Hospital entry</h4>
      <form onSubmit={addHospitalEntry}>
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
          Discharge date
        </div>
        <input
          className="input-underline"
          type="text"
          onChange={({ target }) => setDischargeDate(target.value)}
        />
        <div style={{ color: "#aaaaaa", marginBottom: "5px" }}>
          Discharge criteria
        </div>
        <input
          className="input-underline"
          type="text"
          onChange={({ target }) => setDischargeCriteria(target.value)}
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

export default NewHospitalEntry;
