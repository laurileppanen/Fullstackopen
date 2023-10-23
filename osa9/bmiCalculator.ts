const calculateBmi = (height: number, weight: number) => {
  const heightInMetres = height * 0.01;
  if (weight / heightInMetres ** 2 <= 18.4) {
    return "Thinness (underweight)";
  }

  if (
    weight / heightInMetres ** 2 > 18.4 &&
    weight / heightInMetres ** 2 < 25
  ) {
    return "Normal (healthy weight)";
  }

  if (weight / heightInMetres ** 2 >= 25) {
    return "Obese (overweight)";
  }
};

console.log(calculateBmi(180, 74));
console.log(calculateBmi(180, 40));
console.log(calculateBmi(180, 200));
