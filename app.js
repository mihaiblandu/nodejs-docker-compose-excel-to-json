import express from 'express'
import mongoose from "mongoose";
import Medicament from "./medicament.js"
import convert from "./convert.js"
import bodyParser from "body-parser"
import multer from "multer"
import cors from "cors"

import dotenv from "dotenv"

dotenv.config()

console.log(process.env.DB_USER); // => max
const port = process.env.PORT || 3000;
const DB_PORT = process.env.DB_PORT || 27017;
const DB_USER = process.env.DB_USER || "root";
const DB_PASS = process.env.DB_PASS || "rootpassword";
const DB_URL = process.env.DB_URL || "localhost";

const db = "mongodb://" + DB_USER + ":" + DB_PASS + "@" + DB_URL + ":" + DB_PORT

console.log(db)

// Connect to MongoDB with Mongoose.
mongoose
  .connect(
    db,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }
  )
  .then(() => console.log("MongoDB connected 🚀 \n🌊  🐋  🌊  🐙  🌊  🦈  🌊"))
  .catch(err => console.log(err));

//mongoose.set('debug', true);

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, "file.xlsx")
  }

})

var upload = multer({ storage: storage })

const app = express();

app.use(cors())


app.use(bodyParser.urlencoded({ extended: true }))

app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
  res.send(file)
  Medicament.deleteMany({}, function (err) {
    if (err) console.log(err);
    console.log("Successful deletion");
  });
  convert("./uploads/file.xlsx")
  console.log("Convertion is done ✔️ !")
})

app.get('/json', function (req, res) {
  Medicament.find({}, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});


app.use(express.static('public'));

app.listen(port, function () {
  console.log('App runs on port 3000!')
});