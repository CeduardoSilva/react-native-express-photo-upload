const aws = require("aws-sdk");
const express = require("express");
const multer = require("multer");
const multerS3 = require("multer-s3");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const spacesEndpoint = new aws.Endpoint("fra1.digitaloceanspaces.com");
const s3 = new aws.S3({
  endpoint: spacesEndpoint,
});

// Change bucket property to your Space name
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "ceduardods-bucket",
    acl: "public-read",
    key: function (request, file, cb) {
      console.log("File received:");
      console.log(file);
      cb(null, file.originalname);
    },
  }),
}).array("upload", 1);

app.post("/api/upload", function (request, response, next) {
  upload(request, response, function (error) {
    if (error) {
      console.log("Error Occured:");
      console.log(error);
      response.status(500).json({
        message: "error!",
      });
    } else {
      console.log("File uploaded successfully.");
      response.status(200).json({
        message: "success!",
      });
    }
  });
});

app.listen(3000, () => {
  console.log(`server is running at http://localhost:3000`);
});
