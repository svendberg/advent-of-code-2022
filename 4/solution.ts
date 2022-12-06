import fs from "fs";

const input = fs.readFileSync("4/input.txt", "utf8").split("\n");

const parsedInput = input
  .map((line) => line.split(","))
  .map((pair) => pair.map((p) => p.split("-").map(Number)));

const findOverlap = (all: boolean) =>
  parsedInput.filter(([first, second]) => {
    const [firstStart, firstEnd] = first;
    const [secondStart, secondEnd] = second;
    if (all) {
      return (
        (firstStart >= secondStart && firstEnd <= secondEnd) ||
        (secondStart >= firstStart && secondEnd <= firstEnd)
      );
    }
    return (
      (firstStart <= secondStart && firstEnd >= secondStart) ||
      (secondStart <= firstStart && secondEnd >= firstStart)
    );
  });

console.log("Full overlap pairs: " + findOverlap(true).length);
console.log("Partly overlap pairs: " + findOverlap(false).length);
