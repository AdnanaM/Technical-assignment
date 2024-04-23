const express = require('express'); 
const router = express.Router();
const userController = require('../Controllers/UsersController');

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'avatarPic'); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

router.post('/signup', upload.single('photo'), userController.signup);
router.post('/login', userController.login);
router.get('/', userController.protectSystem, userController.getLoggedUser);
router.post('/forgotPassword', userController.forgotPassword);
router.patch('/resetPassword/:token', userController.resetPassword);
router.patch('/updatePassword', userController.protectSystem, userController.updatePassword);
router.patch('/updateUserInfo', upload.single('photo'), userController.protectSystem, userController.updateUserInfo);
router.patch('/deleteMe', userController.protectSystem, userController.deleteMe);


module.exports = router;