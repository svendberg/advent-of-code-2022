import fs from "fs";

const input = fs.readFileSync("1/input.txt", "utf8").split("\n");

let totals: number[] = [];
let total = 0;

for (const line of input) {
  if (line === "") {
    totals.push(+total);
    total = 0;
  } else {
    total += +line;
  }
}
totals.sort((a, b) => b - a);

console.log("Largest number " + totals[0]);
console.log("Top three numbers " + totals.slice(0, 3).reduce((a, b) => a + b));
