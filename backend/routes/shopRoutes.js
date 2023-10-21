import express from 'express';
import { isAuthenticated,isAdmin ,isSeller} from '../middleware/authMiddleware.js';
import {
    createShop,
    activateShop,
    loginShop,
    getSeller,
    shopLogout,
    getShopInfoById,
    updateShopAvatar,
    updateSellerInfo,
    getAllSeller,
    deleteSellerById,
    updatePaymentMethods,
    deleteWithdrawMethod,
} from '../controllers/shopController.js'
const router = express.Router();

// create shop
router.post("/create-shop",createShop);

// activate user
router.post("/activation",activateShop);


// login shop
router.post("/login-shop",loginShop);

// load shop
router.get(
    "/getSeller",
    isSeller,
    getSeller)


// log Logout from shop
router.get(
    "/logout",
    shopLogout)

// get shop info
router.get(
    "/get-shop-info/:id",
    getShopInfoById);


// update shop profile picture
router.put(
    "/update-shop-avatar",
    isSeller,
    updateShopAvatar
    );

// update seller info
router.put(
    "/update-seller-info",
    isSeller,
    updateSellerInfo);

// all sellers --- for admin
router.get(
    "/admin-all-sellers",
    isAuthenticated,
    isAdmin("Admin"),getAllSeller);

// delete seller ---admin
router.delete(
    "/delete-seller/:id",
    isAuthenticated,
    isAdmin("Admin"),deleteSellerById);

// update seller withdraw methods --- sellers
router.put(
    "/update-payment-methods",
    isSeller,updatePaymentMethods);

// delete seller withdraw merthods --- only seller
router.delete(
    "/delete-withdraw-method/",
    isSeller,deleteWithdrawMethod)



export default router;