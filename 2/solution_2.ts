import fs from "fs";

interface Hand {
  score: number;
  beats: string;
  looses: string;
}

const hands: Record<string, Hand> = {
  A: {
    score: 1,
    beats: "B",
    looses: "C",
  },
  B: {
    score: 2,
    beats: "C",
    looses: "A",
  },
  C: {
    score: 3,
    beats: "A",
    looses: "B",
  },
};

const input = fs.readFileSync("2/input.txt", "utf8").split("\n");

const results = input.map((line) => {
  const [elf, human] = line.split(" ");
  const elfHand = hands[elf];

  switch (human) {
    case "Z":
      return hands[elfHand.beats].score + 6;
    case "Y":
      return elfHand.score + 3;
    case "X":
      return hands[elfHand.looses].score;
  }
});

console.log(results.reduce((a, b) => a! + b!));
