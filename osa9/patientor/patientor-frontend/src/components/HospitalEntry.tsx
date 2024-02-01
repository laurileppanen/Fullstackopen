import { HospitalEntry as HospitalEntryType } from "../types";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { Diagnosis } from "../types";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import diagnoseService from "../services/diagnoses";

const HospitalEntry: React.FC<{ entry: HospitalEntryType }> = ({ entry }) => {
  console.log("ENTRY:", entry);
  const [diagnose, setDiagnose] = useState<Diagnosis[] | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      const fetchPatientDetails = async () => {
        const diagnoseData = await diagnoseService.getDiagnoses();
        setDiagnose(diagnoseData);
      };
      fetchPatientDetails();
    }
  }, [id]);

  return (
    <div>
      <div>
        {entry.date} {<LocalHospitalIcon />}
      </div>
      <div style={{ fontStyle: "italic" }}>{entry.description}</div>
      <ul>
        {entry.diagnosisCodes?.map((code, index) => {
          const matchingDiagnose = diagnose?.find((d) => d.code === code);
          return (
            <li key={index}>
              {code} {matchingDiagnose ? ` ${matchingDiagnose.name}` : ""}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HospitalEntry;
