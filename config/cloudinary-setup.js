const multer = require('multer');
const cloudinary = require('cloudinary');
const keys = require('./keys');

const userImageStorage = multer.diskStorage({
    filename: function (req, file, cd) {
        cd(null, Date.now() + '-' + file.originalname);
        //console.log(file.originalname);
    }
});

const imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

cloudinary.config({
    cloud_name: keys.cloudinary.cloud_name,
    api_key: keys.cloudinary.api_key,
    api_secret: keys.cloudinary.api_secret
});

const userImageUpload = multer({ storage: userImageStorage, fileFilter: imageFilter });

module.exports = {
    userImageUpload: userImageUpload
};
