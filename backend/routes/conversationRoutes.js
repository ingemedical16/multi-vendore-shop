import express from 'express';
import { isSeller,isAuthenticated } from '../middleware/authMiddleware.js';
import {
    createNewConversation,
    getSellerConverstionByuserId,
    getUserConverstionByuserId,
    updateLastMessageById

} from "../controllers/conversationController.js"
const router = express.Router();

// create a new conversation
router.post("/create-new-conversation",createNewConversation);

// get seller conversations
router.get(
    "/get-all-conversation-seller/:id",
    isSeller,getSellerConverstionByuserId);

// get user conversations
router.get(
    "/get-all-conversation-user/:id",
    isAuthenticated,getUserConverstionByuserId);
// update the last message
router.put(
    "/update-last-message/:id",updateLastMessageById)

export default router;