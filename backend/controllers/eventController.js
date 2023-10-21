import asyncHandler from "express-async-handler";
import Shop from '../models/shopModel.js';
import Event from '../models/eventModel.js';
import cloudinary from 'cloudinary';


// @desc    create event
// @route   POST /api/v2/event/create-event
// @access  Public

export const  createEvent = asyncHandler(
    
    async (req, res, next) => {
        try {
          const shopId = req.body.shopId;
          const shop = await Shop.findById(shopId);
          if (!shop) {
            res.status(400);
            throw new Error("Shop Id is invalid!");
          } else {
            let images = [];
    
            if (typeof req.body.images === "string") {
              images.push(req.body.images);
            } else {
              images = req.body.images;
            }
    
            const imagesLinks = [];
    
            for (let i = 0; i < images.length; i++) {
              const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products",
              });
    
              imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
              });
            }
    
            const productData = req.body;
            productData.images = imagesLinks;
            productData.shop = shop;
    
            const event = await Event.create(productData);
    
            res.status(201).json({
              success: true,
              event,
            });
          }
        } catch (error) {
            res.status(500);
            throw new Error(error.message);
        }
      });


// @desc    get all events
// @route   GET /api/v2/event/get-all-events
// @access  Public

export const  getAllEvents = asyncHandler(
    async (req, res, next) => {
        try {
          const events = await Event.find();
          res.status(201).json({
            success: true,
            events,
          });
        } catch (error) {
            res.status(500);
            throw new Error(error.message);
        }
      }
);

// @desc    Get all events of a shop
// @route   GET /api/v2/event/get-all-events/:id"
// @access  

export const  getAllEventsByShop = asyncHandler(
    async (req, res, next) => {
        try {
          const events = await Event.find({ shopId: req.params.id });
    
          res.status(201).json({
            success: true,
            events,
          });
        } catch (error) {
            res.status(500);
            throw new Error(error.message);
        }
      }
    );

// @desc    Delete event of a shop
// @route   DELETE /api/v2/event/delete-shop-event/:id
// @access  

export const  deleteShopEventById = asyncHandler(
    async (req, res, next) => {
        try {
          const event = await Event.findById(req.params.id);
    
          if (!product) {
            return next(new ErrorHandler("Product is not found with this id", 404));
          }    
    
          for (let i = 0; 1 < product.images.length; i++) {
            const result = await cloudinary.v2.uploader.destroy(
              event.images[i].public_id
            );
          }
        
          await event.remove();
    
          res.status(201).json({
            success: true,
            message: "Event Deleted successfully!",
          });
        } catch (error) {
            res.status(500);
            throw new Error(error.message);
        }
      });

// @desc    Get all events --- for admin
// @route   GET /api/v2/event/admin-all-events"
// @access  Admin

export const  getEvents = asyncHandler(
    async (req, res, next) => {
        try {
          const events = await Event.find().sort({
            createdAt: -1,
          });
          res.status(201).json({
            success: true,
            events,
          });
        } catch (error) {
            res.status(500);
            throw new Error(error.message);
        }
      });