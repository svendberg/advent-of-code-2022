import fs from "fs";

const input = fs.readFileSync("5/input.txt", "utf8").split("\n");

const stacks: Record<number, Array<string>> = {
  1: ["J", "H", "P", "M", "S", "F", "N", "V"],
  2: ["S", "R", "L", "M", "J", "D", "Q"],
  3: ["N", "Q", "D", "H", "C", "S", "W", "B"],
  4: ["R", "S", "C", "L"],
  5: ["M", "V", "T", "P", "F", "B"],
  6: ["T", "R", "Q", "N", "C"],
  7: ["G", "V", "R"],
  8: ["C", "Z", "S", "P", "D", "L", "R"],
  9: ["D", "S", "J", "V", "G", "P", "B", "F"],
};

const moves = input.filter((line) => line.startsWith("move"));

const getTopOfModifiedStack = (oneAtATime: boolean) => {
  const stackCopy = structuredClone(stacks);
  const regex = new RegExp(/(\d+).*(\d+).*(\d+)/);
  for (let move of moves) {
    const [_, amount, from, to] = regex.exec(move)!.map((n) => parseInt(n));
    if (oneAtATime) {
      stackCopy[to].push(...stackCopy[from].splice(-amount).reverse());
    } else {
      stackCopy[to].push(...stackCopy[from].splice(-amount));
    }
  }
  let result = "";
  for (let s of Object.values(stackCopy)) {
    result += s[s.length - 1];
  }
  return result;
};

console.log("Solution 1: " + getTopOfModifiedStack(true));
console.log("Solution 2: " + getTopOfModifiedStack(false));
