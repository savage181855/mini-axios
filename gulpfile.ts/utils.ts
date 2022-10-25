import fs from "fs";
import path from "path";

function readDir(dir: string) {
  return fs.readdirSync(dir, {}) as string[];
}

function isFile(dir: string) {
  return fs.statSync(dir).isFile();
}

export function getAllFiles(dir: string) {
  const fileMap: Record<string, string[]> = {};

  getFiles(dir);
  function getFiles(dir: string) {
    const res = readDir(dir);
    res.forEach((file) => {
      const fullpath = path.resolve(dir, file);
      if (isFile(fullpath)) {
        const ext = fullpath.split(".").reverse()[0];

        fileMap[ext]?.push(fullpath) || (fileMap[ext] = [fullpath]);
      } else {
        getFiles(fullpath);
      }
    });
  }

  return fileMap;
}

function isEmptyDir(fPath: string) {
  var pa = fs.readdirSync(fPath);
  if (pa.length === 0) {
    return true;
  } else {
    return false;
  }
}

export function removeEmptyDir(fPath: string) {
  if (isEmptyDir(fPath)) {
    fs.rmdirSync(fPath);
  }
}