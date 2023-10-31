import diagnoses from "../../data/diagnoses";

import { DiagnoseEntry } from "../types";

const getDiagnoses = (): DiagnoseEntry[] => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return diagnoses;
};

export default {
  getDiagnoses,
};
