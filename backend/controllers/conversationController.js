import asyncHandler from "express-async-handler";
import Conversation from "../models/conversationModel.js";


// @desc    create a new conversation
// @route   POST /api/v2/conversation/create-new-conversation
// @access  Public
export const createNewConversation = asyncHandler(
    async (req, res, next) => {
        try {
          const { groupTitle, userId, sellerId } = req.body;
    
          const isConversationExist = await Conversation.findOne({ groupTitle });
    
          if (isConversationExist) {
            const conversation = isConversationExist;
            res.status(201).json({
              success: true,
              conversation,
            });
          } else {
            const conversation = await Conversation.create({
              members: [userId, sellerId],
              groupTitle: groupTitle,
            });
    
            res.status(201).json({
              success: true,
              conversation,
            });
          }
        } catch (error) {
            res.status(500);
            throw new Error(error.message);
        }
      }
);

// @desc    get seller conversations
// @route   GET /api/v2/conversation//get-all-conversation-seller/:id"
// @access  Seller
export const getSellerConverstionByuserId = asyncHandler(
    async (req, res, next) => {
        try {
          const conversations = await Conversation.find({
            members: {
              $in: [req.params.id],
            },
          }).sort({ updatedAt: -1, createdAt: -1 });
    
          res.status(201).json({
            success: true,
            conversations,
          });
        } catch (error) {
            res.status(500);
            throw new Error(error.message);
        }
      } 
);


// @desc    get user conversations
// @route   GET /api/v2/conversation/get-all-conversation-user/:id
// @access  Private
export const getUserConverstionByuserId = asyncHandler(
    async (req, res, next) => {
        try {
          const conversations = await Conversation.find({
            members: {
              $in: [req.params.id],
            },
          }).sort({ updatedAt: -1, createdAt: -1 });
    
          res.status(201).json({
            success: true,
            conversations,
          });
        } catch (error) {
            res.status(500);
            throw new Error(error.message);
        }
      }
);


// @desc    get user conversations
// @route   GET /api/v2/conversation/update-last-message/:id
// @access  Private
export const updateLastMessageById = asyncHandler(async (req, res, next) => {
    try {
      const { lastMessage, lastMessageId } = req.body;

      const conversation = await Conversation.findByIdAndUpdate(req.params.id, {
        lastMessage,
        lastMessageId,
      });

      res.status(201).json({
        success: true,
        conversation,
      });
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
  });

  
