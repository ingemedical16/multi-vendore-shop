import express from 'express';
import { isAuthenticated,isAdmin , isSeller} from '../middleware/authMiddleware.js';
import {
    createWithdraw,
    getAllWithdraw,
    updateWithdrawById
} from '../controllers/withdrawController.js'
const router = express.Router();


// create withdraw request --- only for seller
router.post(
    "/create-withdraw-request",
    isSeller,createWithdraw);

// get all withdraws --- admnin
router.get(
        "/get-all-withdraw-request",
        isAuthenticated,
        isAdmin("Admin"),
        getAllWithdraw);


// update withdraw request ---- admin
router.put(
    "/update-withdraw-request/:id",
    isAuthenticated,
    isAdmin("Admin"),
    updateWithdrawById)

export default router;