import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import patientService from "../services/patients";
import { Patient } from "../types";

import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";

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

  const date = patient.entries.map((e) => e.date);
  const description = patient.entries.map((e) => e.description);

  const diagnoseCodes = patient.entries.map((e) => e.diagnosisCodes);

  const koodit = diagnoseCodes.flat();
  console.log("KOODIT:", koodit);

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
      <div>
        {date} {description}
      </div>
      <ul>
        {koodit.map((code, index) => (
          <li key={index}>{code}</li>
        ))}
      </ul>
    </div>
  );
};

export default PatientDetails;
