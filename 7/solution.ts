import fs from "fs";

const input = fs.readFileSync("7/input.txt", "utf8").split("\n");

interface File {
  name: string;
  size: number;
}

interface Folder {
  name: string;
  parent?: Folder;
  folders: Array<Folder>;
  files: Array<File>;
  size: number;
}

const folderStructure: Folder = {
  name: "root",
  folders: [],
  files: [],
  size: 0,
};

let currentFolder: Folder = folderStructure;

for (const line of input.slice(1, input.length)) {
  const isCommand = line.startsWith("$");
  if (isCommand) {
    const currentCommand = line.replace("$ ", "");
    const [command, param] = currentCommand.split(" ");

    if (command === "cd") {
      if (param === "..") {
        currentFolder = currentFolder.parent!;
      } else {
        currentFolder = currentFolder.folders.find(
          (folder) => folder.name === param
        )!;
      }
    }
  } else {
    const [part1, part2] = line.split(" ");
    if (part1 === "dir") {
      if (!currentFolder.folders.map((folder) => folder.name).includes(part2)) {
        const folder: Folder = {
          name: part2,
          folders: [],
          files: [],
          parent: { ...currentFolder },
          size: 0,
        };
        currentFolder.folders.push(folder);
      }
    } else {
      const file: File = {
        name: part2,
        size: +part1,
      };
      currentFolder.size += file.size;
      currentFolder.files.push(file);
    }
  }
}

const totalSizes: Array<number> = [];

const findTotalSize = (folder: Folder) => {
  let size = folder.size;
  const findFolderSize = (folder: Folder) => {
    for (const f of folder.folders) {
      size += f.size;
      findFolderSize(f);
    }
  };
  findFolderSize(folder);
  totalSizes.push(size);
  for (const sf of folder.folders) {
    findTotalSize(sf);
  }
};

findTotalSize(folderStructure);

console.log(
  "Solution 1:" +
    totalSizes.filter((size) => size <= 100000).reduce((a, b) => a + b, 0)
);

const avilable = 70000000 - Math.max(...totalSizes);
const needed = 30000000 - avilable;

const closest = Math.min(...totalSizes.filter((size) => size >= needed));

console.log("Solutions 2: " + closest);
