import asyncHandler from "express-async-handler";
import Messages from '../models/messagesModel.js';
import cloudinary from 'cloudinary';

// @desc    create event
// @route   POST /api/v2/message/create-new-message
// @access  Public

export const  createMessage = asyncHandler(
    async (req, res, next) => {
        try {
          const messageData = req.body;
    
          if (req.body.images) {
            const myCloud = await cloudinary.v2.uploader.upload(req.body.images, {
              folder: "messages",
            });
            messageData.images = {
              public_id: myCloud.public_id,
              url: myCloud.url,
            };
          }
    
          messageData.conversationId = req.body.conversationId;
          messageData.sender = req.body.sender;
          messageData.text = req.body.text;
    
          const message = new Messages({
            conversationId: messageData.conversationId,
            text: messageData.text,
            sender: messageData.sender,
            images: messageData.images ? messageData.images : undefined,
          });
    
          await message.save();
    
          res.status(201).json({
            success: true,
            message,
          });
        } catch (error) {
            res.status(500);
            throw new Error(error.message);
        }
      });

// @desc    Get all messages with conversation id
// @route   GET /api/v2/message/get-all-messages/:id
// @access  Public

export const  getAllMessages = asyncHandler(
    async (req, res, next) => {
        try {
          const messages = await Messages.find({
            conversationId: req.params.id,
          });
    
          res.status(201).json({
            success: true,
            messages,
          });
        } catch (error) {
            res.status(500);
            throw new Error(error.message);
        }
      });