// const fs = require('fs')
// const join = require('path').join
// function findSync(startPath) {
//   let result = [];
//   function finder(path) {
//     let files = fs.readdirSync(path)
//     files.forEach((val, index) => {
//       let fPath = join(path, val)
//       let stats = fs.statSync(fPath)
//       if (stats.isDirectory()) {
//         result.push(fPath)
//         // 递归读取文件夹下文件
//         // finder(fPath)
//       };
//       // 读取文件名
//       // if(stats.isFile()) result.push(fPath)
//     });

//   }
//   finder(startPath)
//   console.log(result)
//   return result
// }
// let filePath = findSync('./src/app')
// exports.filePath = filePath


let arr = []
let devPath = null
let packPath = null
process.argv.forEach((val, index) => {
  arr.push(`${val}`)
});
// console.log(arr)
devPath = 'src/app/' + arr[2]
packPath = 'src/app/' + arr[4]
exports.devPath = devPath
exports.packPath = packPath