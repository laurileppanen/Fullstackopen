import { isNotNumber } from "./utils";

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArguments = (args: string[]) => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const period = args.slice(3);
  const periodAsNumbers: number[] = period.map((str) => parseFloat(str));

  if (periodAsNumbers.some(isNotNumber)) {
    throw new Error("Provided values were not numbers!");
  } else {
    return periodAsNumbers;
  }
};

export const calculateExercises = (results: Array<number>, target: number) => {
  const periodLength = results.length;
  const trainingDays = results.filter((result) => result > 0).length;
  const average = results.reduce((a, b) => a + b, 0) / periodLength;
  let success: boolean = false;
  let rating = 0;
  let ratingDescription = "";

  if (average - target <= -5) {
    success = false;
    rating = 0;
    ratingDescription = "Not even close";
  } else if (average - target < -1 && average - target > -5) {
    success = false;
    rating = 1;
    ratingDescription = "Must be better";
  } else if (average - target >= -1 && average - target < 0) {
    success = false;
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else if (average - target >= 0) {
    success = true;
    rating = 3;
    ratingDescription = "Just like that!";
  }

  const result: Result = {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average,
  };

  console.log(result);
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const periodTable = parseArguments(process.argv);

  const target = process.argv[2];
  const targetAsNumber: number = parseFloat(target);

  calculateExercises(periodTable, targetAsNumber);
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
