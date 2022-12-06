import fs from "fs";

const input = fs.readFileSync("6/input.txt", "utf8").trim();

[4, 14].map((v) => {
  for (var i = v; i < input.length; i++) {
    const set = new Set(input.slice(i - v, i));
    if (set.size == v) {
      console.log(`First ${v} char unique seq on: ${i}`);
      break;
    }
  }
});
