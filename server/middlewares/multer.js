import multer from "multer";

export const upload = multer({
    dest: 'uploads/', // Destination directory for storing uploaded files
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
