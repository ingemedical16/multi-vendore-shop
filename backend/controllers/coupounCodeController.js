import asyncHandler from "express-async-handler";
import CoupounCode from "../models/coupounCodeModel.js";


// @desc    // create coupoun code
// @route   POST /api/v2/coupon/create-coupon-code
// @access  Seller

export const  createCouponCode = asyncHandler(
    async (req, res, next) => {
        try {
          const isCoupounCodeExists = await CoupounCode.find({
            name: req.body.name,
          });
    
          if (isCoupounCodeExists.length !== 0) {
            res.status(400);
            throw new Error("Coupoun code already exists!");
          }
    
          const coupounCode = await CoupounCode.create(req.body);
    
          res.status(201).json({
            success: true,
            coupounCode,
          });
        } catch (error) {
            res.status(500);
            throw new Error(error.message);
        }
      });

// @desc    // create coupoun code
// @route   GET /api/v2/coupon//get-coupon/:id
// @access  Seller

export const  getAllCouponsByShop = asyncHandler(
    async (req, res, next) => {
        try {
          const couponCodes = await CoupounCode.find({ shopId: req.seller.id });
          res.status(201).json({
            success: true,
            couponCodes,
          });
        } catch (error) {
            res.status(500);
            throw new Error(error.message);
        }
      }
);

// @desc    delete coupoun code of a shop
// @route   DELETE /api/v2/coupon/delete-coupon/:id
// @access  Seller

export const  deleteCoupon = asyncHandler(
 async (req, res, next) => {
        try {
          const couponCode = await CoupounCode.findByIdAndDelete(req.params.id);
    
          if (!couponCode) {
            res.status(400);
            throw new Error("Coupon code dosen't exists!");
          }
          res.status(201).json({
            success: true,
            message: "Coupon code deleted successfully!",
          });
        } catch (error) {
            res.status(500);
            throw new Error(error.message);
        }
      }
);


// @desc    Get coupon code value by its name
// @route   GET /api/v2/coupon/get-coupon-value/:name
// @access  public

export const  getCouponsByName = asyncHandler(
    async (req, res, next) => {
        try {
          const couponCode = await CoupounCode.findOne({ name: req.params.name });
    
          res.status(200).json({
            success: true,
            couponCode,
          });
        } catch (error) {
            res.status(500);
            throw new Error(error.message);
        }
      });