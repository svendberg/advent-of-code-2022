import fs from "fs";

interface Hand {
  identifiers: string[];
  score: number;
  beatsScore: number;
}

const hands: Hand[] = [
  {
    identifiers: ["A", "X"],
    score: 1,
    beatsScore: 3,
  },
  {
    identifiers: ["B", "Y"],
    score: 2,
    beatsScore: 1,
  },
  {
    identifiers: ["C", "Z"],
    score: 3,
    beatsScore: 2,
  },
];

const input = fs.readFileSync("2/input.txt", "utf8").split("\n");

const results = input.map((line) => {
  const [elf, human] = line.split(" ");
  const elfHand = hands.find((hand) => hand.identifiers.includes(elf));
  const humanHand = hands.find((hand) => hand.identifiers.includes(human));

  let score = humanHand!.score;
  if (humanHand?.beatsScore === elfHand?.score) {
    score += 6;
  } else if (humanHand?.score === elfHand?.score) {
    score += 3;
  }
  console.log(elf, human, score);
  return score;
});

console.log(results.reduce((a, b) => a + b));
