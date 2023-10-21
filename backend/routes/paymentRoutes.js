import express from 'express';
import {
    processPayment,
    stripeapikey
} from "../controllers/paymentController.js"
const router = express.Router();

router.post(
    "/process",processPayment);


    router.get(
        "/stripeapikey",stripeapikey)

export default router;