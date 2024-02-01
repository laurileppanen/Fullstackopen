import { OccupationalHealthcareEntry as OccupationalHealthcareEntryType } from "../types";
import WorkIcon from "@mui/icons-material/Work";

const OccupationalHealthcareEntry: React.FC<{
  entry: OccupationalHealthcareEntryType;
}> = ({ entry }) => {
  return (
    <div>
      <div>
        {entry.date} {<WorkIcon />}
      </div>
      <div style={{ fontStyle: "italic" }}>{entry.description}</div>
      <div>Diagnose by {entry.specialist}</div>
    </div>
  );
};

export default OccupationalHealthcareEntry;
