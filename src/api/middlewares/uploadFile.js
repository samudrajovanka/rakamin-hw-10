const multer = require('multer');
const path = require('path');

const { InvariantError } = require('../../exceptions');

/**
 * @description accept file format
 */
const fileFilter = (acceptedFormat) => (req, file, callback) => {
  if (acceptedFormat.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(new InvariantError('Format file tidak didukung'));
  }
}

/**
 * @description storage engine
 */
const storage = (folder) => multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join('public', folder))
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + file.originalname)
  }
});

const uploadImage = multer({
  storage: storage('images'),
  limits: {
    fileSize: 5 * 1024 * 1024, // 1mb
  },
  fileFilter: fileFilter(['image/png', 'image/jpg', 'image/jpeg']),
});


const upload = (type) =>
  (engine, option) =>
  (req, res, next) => {
  let uploadEngine;
  switch (type) {
    case 'image':
      uploadEngine = uploadImage;
      break;
  }

  uploadEngine[engine](...option)(req, res, (err) => {
    if (err) {
      console.log(err);
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
          next(new InvariantError('File yang diupload melebihi batas maksimal'));
        }
      }

      next(err);
    }

    next();
  });
}

module.exports = upload;