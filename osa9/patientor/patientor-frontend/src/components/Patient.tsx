import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import patientService from "../services/patients";
import diagnoseService from "../services/diagnoses";
import { Diagnosis, Patient } from "../types";

import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";

const PatientDetails = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const { id } = useParams<{ id: string }>();
  const [diagnose, setDiagnose] = useState<Diagnosis[] | null>(null);

  useEffect(() => {
    if (id) {
      const fetchPatientDetails = async () => {
        const patientData = await patientService.getById(id);
        const diagnoseData = await diagnoseService.getDiagnoses();
        setPatient(patientData);
        setDiagnose(diagnoseData);
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
        {koodit.map((code, index) => {
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

export default PatientDetails;
