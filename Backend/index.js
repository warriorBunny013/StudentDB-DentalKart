import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/Database.js";
import router from "./routes/index.js";
import fs from 'fs';
import path from 'path';
import mysql from 'mysql';
import multer from "multer";
import csv from 'fast-csv'
import bodyparser from 'body-parser';
import csvparser from 'csv-parser';
import fileUpload from "express-fileupload";
dotenv.config();
const app = express();

app.use(bodyparser.urlencoded({
    extended: true
}))
//multer config

// var storage = multer.diskStorage({
//     destination: (req, file, callBack) => {
//         callBack(null, './uploads/')    
//     },
//     filename: (req, file, callBack) => {
//         callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//     }
// }) 
// var upload = multer({
//     storage: storage
// });
// db connection
app.use(bodyparser.json())
try {
    await db.authenticate();
    console.log('Database Connected...');
} catch (error) {
    console.error(error);
}
// // Database connection
// const connection= mysql.createPool({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "auth_db"
// })




// app.post('/import-csv', upload.single("import-csv"), (req, res) =>{
//     console.log(req.file.path)
//     uploadCsv(__dirname + '/uploads/' + req.file.filename);
//     res.send("data imported")
// });

// function uploadCsv(uriFile){
//     let stream = fs.createReadStream(uriFile);
//     let csvDataColl = [];
//     let fileStream = csv
//         .parse()
//         .on("data", function (data) {
//             csvDataColl.push(data);
//         })
//         .on("end", function () {
//             csvDataColl.shift();
            
//             db.getConnection((error,connection) => {
//                 if (error) {
//                     console.error(error);
//                 } else {
//                     let query = "INSERT INTO `students`(`rollno`, `name`, `address`, `institute`, `course`) VALUES (?,?,?,?,?)";
//                     connection.query(query, [csvDataColl], (error, res) => {
//                         console.log(error || res);
//                     });
//                 }
//             });
 
//             fs.unlinkSync(uriFile)
            
//         });
  
//     stream.pipe(fileStream);
// }
app.use(cors({ credentials:true, origin:'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.json());
app.use(router);

// const ws = fs.createWriteStream("file.csv");

// app.get("/exportcsv", (req, res) => {
//     connection.query("SELECT * FROM students", function (err, data) {
//       if (err) throw err;
  
//       //JSON
//       const jsonData = JSON.parse(JSON.stringify(data));
//       console.log("jsonData", jsonData);
  
//       //csv
//       fastcsv
//         .write(jsonData, { headers: true })
//         .on("finish", function () {
//           console.log("Write to itbuddies.csv successfully!");
//         })
//         .pipe(ws);
//     });
//   });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
  });
  
  const upload = multer({ storage: storage });
  
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'auth_db',
  });
  
  connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database!');
  });
  app.use('/upload',express.static('uploads'))
  app.post('/upload', upload.single('file'), (req, res) => {
    const fileRows = [];
    csv.parseFile(req.file.path).on('data', (data) => {
        fileRows.push(data);
        console.log(data)
      }).on('end', () => {
        fs.unlinkSync(req.file.path);
        // Remove the header row
        fileRows.shift();
        const sql = "INSERT INTO `students`(`rollno`, `name`, `address`, `institute`, `course`) VALUES (?,?,?,?,?)";
        const values = fileRows.map((row) => [null, row[0], row[1]]);
        connection.query(sql, [values], (err, result) => {
          if (err) throw err;
          console.log(result.affectedRows + ' rows inserted!');
          res.send('CSV file uploaded successfully!');
        });
      });
  });
  


app.listen(5000, ()=> console.log('Server running at port 5000'));