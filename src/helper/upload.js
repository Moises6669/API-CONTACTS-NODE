const { v4: uuidv4 } = require('uuid');
const path = require('path');
const multer = require('multer');
 

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/images'),
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname).toLowerCase());
    },
});

const upload = multer({
    storage: storage,
    dest: path.join(__dirname, '../public/images'),
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif|svg/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));

        if (mimetype && extname) {
            return cb(null, true);
        }

        cb("error: File must be a valid image");
    }
});

module.exports = upload;