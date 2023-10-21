import express from 'express';
import { isAuthenticated,isAdmin } from '../middleware/authMiddleware.js';
import {createMessage, getAllMessages} from '../controllers/messageController.js'


const router = express.Router();

// create new message
router.post(
    "/create-new-message",createMessage)


    // get all messages with conversation id
router.get(
    "/get-all-messages/:id",getAllMessages)




export default router;


