import express from 'express';
import { isSeller } from '../middleware/authMiddleware.js';
import {
    createCouponCode,
    getAllCouponsByShop,
    deleteCoupon,
    getCouponsByName
} from '../controllers/coupounCodeController.js'

const router = express.Router();

// create coupoun code
router.post(
    "/create-coupon-code",
    isSeller,createCouponCode);

// get all coupons of a shop
router.get(
    "/get-coupon/:id",
    isSeller,getAllCouponsByShop);

  // delete coupoun code of a shop
router.delete(
    "/delete-coupon/:id",
    isSeller,deleteCoupon);

// get coupon code value by its name
router.get(
    "/get-coupon-value/:name",getCouponsByName)


export default router;