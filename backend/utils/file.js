import path from "path";
import fs from "fs";
const __dirname = path.resolve();
const clearImage = (filePath) => {
  filePath = path.join(__dirname,"backend", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};

export default clearImage;
