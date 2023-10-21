import asyncHandler from "express-async-handler";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// @desc    process payment
// @route   POST /api/v2/payment/process
// @access  private

export const  processPayment = asyncHandler(
    async (req, res, next) => {
        const myPayment = await stripe.paymentIntents.create({
          amount: req.body.amount,
          currency: "ron",
          metadata: {
            company: "X-mag",
          },
        });
        res.status(200).json({
          success: true,
          client_secret: myPayment.client_secret,
        });
      });

// @desc    get stripeapikey
// @route   GET /api/v2/payment/stripeapikey
// @access  private

export const  stripeapikey = asyncHandler(
    async (req, res, next) => {
        res.status(200).json({ stripeApikey: process.env.STRIPE_API_KEY });
});