const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, '/Users/ceduardo/Repos/react-native-express-photo-upload/server/images');
  },
  filename(req, file, callback) {
    const path = `${file.fieldname}_${Date.now()}_${file.originalname}`
    callback(null, path);
  },
});

const upload = multer({ storage });

app.get('/', (req, res) => {
  res.status(200).send('You can post to /api/upload.');
});

app.post('/api/upload', upload.array('photo', 3), (req, res) => {
  res.status(200).json({
    message: 'success!',
  });
});

app.listen(3000, () => {
  console.log(
    `server is running at http://localhost:3000`
  );
});
