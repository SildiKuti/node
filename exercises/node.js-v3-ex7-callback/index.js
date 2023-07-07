const fs = require("fs");

const fileName = "example.txt";
const content = "This is an example text file.";

fs.writeFile(fileName, content, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`The file ${fileName} has been saved!`);
});
