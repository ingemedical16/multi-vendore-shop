import express from 'express';
import { isAuthenticated,isAdmin,isSeller} from '../middleware/authMiddleware.js';
import {
    createOrder, 
    getShopOrdrsById,
    updateOrderStatus,
    getUserOrdrs,
    giveRefund,
    getOrders,
    acceptRefund
} from '../controllers/orderController.js';


const router = express.Router();

// create new order
router.post(
    "/create-order",createOrder);

// get all orders of user
router.get(
    "/get-all-orders/:userId",getUserOrdrs);


// get all orders of seller
router.get(
    "/get-seller-all-orders/:shopId",getShopOrdrsById);

// update order status for seller
router.put(
    "/update-order-status/:id",
    isSeller,updateOrderStatus);

// give a refund ----- user
router.put(
    "/order-refund/:id",
    isSeller,giveRefund);

// accept the refund ---- seller
router.put(
    "/order-refund-success/:id",
    isSeller,acceptRefund)

// all orders --- for admin
router.get(
        "/admin-all-orders",
        isAuthenticated,
        isAdmin("Admin"),getOrders)

export default router;