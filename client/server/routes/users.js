import express from "express";
// import { upload } from "../middlewares/multer.js";
import { login,signup } from "../controllers/auth.js"
import { getAllUsers, updateProfile, updateProfilepic } from "../controllers/users.js"
import { googleSignIn } from "../controllers/auth.js";
import { resetPassword, resetPasswordRequest } from "../controllers/auth.js";
import auth from '../middlewares/auth.js'

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

console.log("sr1");

router.post('/google/signin', googleSignIn);
// router.post('/google/signup', googleSignIn);

router.get('/getAllUsers', getAllUsers);
router.patch('/update/:id', auth, updateProfile);
// router.post('/updateProfilepic/:id', auth, upload.single('image') , updateProfilepic);

router.post('/reset-password-request', resetPasswordRequest);
router.post('/reset-password/:token', resetPassword);


export default router;