const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();
app.use(cors());
// app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public");
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}-${file.originalname}.csv`);
  },
});

const upload = multer({ storage }).single("file");

app.post("/upload", (req, res) => {
  // res.json({ success: true });
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file);
  });
});

// app.post("/upload", upload.single("file"), function (req, res) {
//   res.json({ message: "file saved on server" });
// });

app.listen(8080);
