const multer = require("multer");

//create storage engine...

let filerstorageengine = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./public/images");
  },

  filename: (req, file, callback) => {
    let data = Date.now();

    callback(null, data + "--" + file.originalname);
  },
});

const upload = multer({ storage: filerstorageengine });

module.exports = upload;
