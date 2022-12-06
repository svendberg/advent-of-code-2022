import fs from "fs";

const input = fs.readFileSync("3/input.txt", "utf8").split("\n");

const priority = (char: string) =>
  char.charCodeAt(0) - 96 + (char.toUpperCase() === char[0] ? +58 : 0);

const misplacedElementPrioritys = input.map((line) => {
  const compartment1 = line.slice(0, line.length / 2).split("");
  const compartment2 = line.slice(line.length / 2).split("");

  const same = compartment1.find((char) => compartment2.includes(char));
  return priority(same!);
});

console.log(
  "The priority sum of all missplaced elements: " +
    misplacedElementPrioritys.reduce((a, b) => a + b)
);

let badgePrioritySum = 0;
for (let i = 0; i < input.length; i += 3) {
  const chunk = input.slice(i, i + 3);
  const same = chunk[0]
    .split("")
    .find((char) => chunk[1].includes(char) && chunk[2].includes(char));
  badgePrioritySum += priority(same!);
}

console.log("The priority sum of all badges: " + badgePrioritySum);
