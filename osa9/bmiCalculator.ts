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

const calculateBmi = (height: number, weight: number) => {
  const heightInMetres = height * 0.01;
  if (weight / heightInMetres ** 2 <= 18.4) {
    console.log("Thinness (underweight)");
  }

  if (
    weight / heightInMetres ** 2 > 18.4 &&
    weight / heightInMetres ** 2 < 25
  ) {
    console.log("Normal (healthy weight)");
  }

  if (weight / heightInMetres ** 2 >= 25) {
    console.log("Obese (overweight)");
  }
};

try {
  const { height, weight } = parseArguments(process.argv);
  calculateBmi(height, weight);
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
