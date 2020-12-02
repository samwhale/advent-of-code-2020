const fs = require("fs");
const path = require("path");

const readFile = (relativePath, encoding = "utf8") => {
  return fs.readFileSync(
    path.resolve(__dirname, relativePath),
    encoding,
    (err, data) => {
      if (err) throw err;

      return data;
    }
  );
};

module.exports = {
  readFile,
};
