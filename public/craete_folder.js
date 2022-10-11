// const fs = require("fs");
// const path = require("path");

// function organizeFn() {
//   let destPath;
//   let dirpath = "C:\\Users\\Yuvi\\Desktop\\";

//   if (dirpath == undefined) {
//     console.log("Please enter a valid directory path with quotes");
//     return;
//   } else {
//     let doesExist = fs.existsSync(dirpath);

//     if (doesExist == true) {
//       destPath = path.join(dirpath, "organized_files");

//       if (fs.existsSync(destPath) == false) {
//         fs.mkdirSync(destPath);
//         console.log("Organized and organized folder created");
//       } else {
//         console.log("This folder already exists");
//       }
//     } else {
//       console.log("Please enter a valid path");
//     }
//   }
//   //   organizeHelper(dirpath, destPath);
// }
