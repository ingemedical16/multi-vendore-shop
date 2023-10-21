import express from 'express';
import multer from 'multer';
import {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  createUser,
  updateUserAddresses,
  deleteUserAddress,
  updateUserPassword,
  getUserInfo,
  getAllUsers,
  deleteUser,
  updateUserAvatar
} from '../controllers/userController.js';
import { isAuthenticated,isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();
const upload = multer();



// @desc    Create a new user
// @route   POST /api/v2/user/create-user"
// @access  Public
router.post("/create-user",createUser);

// @desc    Activate and Register a new user
// @route   POST /api/v2/user/register
// @access  Public
router.post('/register', registerUser);

// @desc    Login user & get token
// @route   POST /api/v2/user/auth
// @access  Public
router.post('/auth', loginUser);

// @desc    Logout user / clear cookie
// @route   POST /api/v2/user/logout
// @access  Private
router.post('/logout', logoutUser);

// @desc    Get user profile
// @route   GET /api/v2/user/profile
// @desc    Update user profile
// @route   PUT /api/v2/user/profile
// @access  Private
router
  .route('/profile')
  .get(isAuthenticated, getUserProfile)
  .put(isAuthenticated, updateUserProfile);

// @desc    update user avatar
// @route   PUT /api/v2/user/update-avatar
// @access  Private
router.put("/update-avatar",isAuthenticated,
upload.single('file'),updateUserAvatar)

// @desc    update user addresses
// @route   PUT /api/v2/user/update-user-addresses
// @access  Private
router.put(
  "/update-user-addresses",
  isAuthenticated,updateUserAddresses);


// @desc    delete user address
// @route   DELETE /api/v2/user/delete-user-address/:id
// @access  Private
router.delete(
  "/delete-user-address/:id",
  isAuthenticated,deleteUserAddress)

// @desc    update user password
// @route   PUT /api/v2/user/update-user-password
// @access  Private
router.put(
  "/update-user-password",
  isAuthenticated,updateUserPassword)

// @desc    Find user infoormation with the userId
// @route   GET /api/v2/user/user-info/:id
// @access  public
router.get(
  "/user-info/:id",getUserInfo);



// @desc    Get  all users --- for admin
// @route   GET /api/v2/user/admin-all-users
// @access  Private AdminRoot
router.get(
  "/admin-all-users",
  isAuthenticated,
  isAdmin("Admin"),getAllUsers)

// @desc    DELETE  delete users --- admin
// @route   DELETE /api/v2/user/delete-user/:id
// @access  Private AdminRoot
router.delete(
  "/delete-user/:id",
  isAuthenticated,
  isAdmin("Admin"),deleteUser);



export default router;