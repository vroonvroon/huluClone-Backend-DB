const express = require('express');
const router = express.Router();
const {SignUp, LogIn, User, deleteUser, updateUser} = require('../controllers/controller');
const authMiddleware = require('../middlewares/auth-middleware');
const validate = require('../middlewares/validate-middleware');
const signupSchema = require('../validator/auth-validator');


router.route('/signup').post(validate(signupSchema), SignUp);
router.route('/login').post(LogIn);
router.route('/getuser').get(authMiddleware, User);
router.route('/getuser/delete/:id').delete(authMiddleware, deleteUser);
router.route('/getuser/update/:id').patch(authMiddleware, updateUser);


module.exports = router;