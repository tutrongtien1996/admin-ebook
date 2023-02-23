const multer  = require('multer')
const fs = require('fs')


var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'upload');
    },
    filename: function(req, file, cb) {
      const ext = file.mimetype.split("/")[1];
      cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
      req.fileName = file.filename;
    },
});

const uploadProduct = multer({ storage: storage });

 module.exports = {uploadProduct }
  