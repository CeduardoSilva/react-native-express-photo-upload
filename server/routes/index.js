var express = require('express');
var router = express.Router();
var multer = require('multer');
var bodyParser = require('body-parser');

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './images');
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('ass')
  res.send('respond with a resource');
});

// router.post('/upload', upload.array('photo', 3), (req, res) => {
//   console.log('file', req.files);
//   console.log('body', req.body);
//   res.status(200).json({
//     message: 'success!',
//   });
// });

router.post('/upload', (req, res) => {
  res.send({ body: 'ass'})
});

module.exports = router;
