import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import patientService from "../services/patients";

import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import EntryDetails from "./EntryDetails";
import { Entry } from "../types";
import { Patient } from "../types";

const PatientDetails = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const { id } = useParams<{ id: string }>();

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

  return (
    <div>
      <h2>
        {patient.name}
        {patient.gender === "male" && <MaleIcon />}
        {patient.gender === "female" && <FemaleIcon />}
      </h2>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
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
    </div>
  );
};

export default PatientDetails;
