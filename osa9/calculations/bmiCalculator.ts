import { isNotNumber } from "./utils";

const parseArguments = (args: string[]) => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (args.slice(2).some(isNotNumber)) {
    throw new Error("Provided values were not numbers!");
  } else {
    return {
      height: Number(process.argv[2]),
      weight: Number(process.argv[3]),
    };
  }
};

export const calculateBmi = (height: number, weight: number) => {
  const heightInMetres = height * 0.01;
  const bmi = weight / heightInMetres ** 2;
  if (bmi <= 18.4) {
    return "Thinness (underweight)";
  }

  if (bmi > 18.4 && bmi < 25) {
    return "Normal (healthy weight)";
  }

  if (bmi >= 25) {
    return "Obese (overweight)";
  }

  return "unknown";
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
