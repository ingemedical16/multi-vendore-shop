import express from 'express';
import {uploadUserAvatar} from '../controllers/uploadController.js';
import multer from 'multer';
import { isAuthenticated,isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

const upload = multer();

// @desc    upload Avatar 
// @route   POST /api/v2/upload/avatar
// @access  public

router.post(
    '/avatar',
    upload.single('file'),
    uploadUserAvatar)






export default router;