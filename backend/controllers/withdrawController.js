import asyncHandler from "express-async-handler";
import Shop from "../models/shopModel.js";
import Withdraw from '../models/withdrawModel.js';
import sendMail from "../utils/sendMail.js";

// @desc    create withdraw request --- only for seller
// @route   POST /api/v2/withdraw/create-withdraw-request
// @access  Seller
export const createWithdraw = asyncHandler(
    async (req, res, next) => {
        try {
            const { amount } = req.body;

            const data = {
                seller: req.seller,
                amount,
            };

      try {
        await sendMail({
          email: req.seller.email,
          subject: "Withdraw Request",
          message: `Hello ${req.seller.name}, Your withdraw request of ${amount}$ is processing. It will take 3days to 7days to processing! `,
        });
        res.status(201).json({
          success: true,
        });
      } catch (error) {
            res.status(500);
            throw new Error(error.message);
      }

      const withdraw = await Withdraw.create(data);

      const shop = await Shop.findById(req.seller._id);

      shop.availableBalance = shop.availableBalance - amount;

      await shop.save();

      res.status(201).json({
        success: true,
        withdraw,
      });
           
        } catch (error) {
            res.status(500);
            throw new Error(error.message);
        }
    });


// @desc    get all withdraws --- admnin
// @route   GET /api/v2/withdraw/get-all-withdraw-request
// @access  Admin
export const getAllWithdraw = asyncHandler(
    async (req, res, next) => {
        try {
            const withdraws = await Withdraw.find().sort({ createdAt: -1 });

            res.status(201).json({
              success: true,
              withdraws,
            });
           
        } catch (error) {
            res.status(500);
            throw new Error(error.message);
        }
    });

    
// @desc    update withdraw request ---- admin
// @route   PUT /api/v2/withdraw/update-withdraw-request/:id
// @access  Admin
export const updateWithdrawById  = asyncHandler(
    async (req, res, next) => {
        try {
            const { sellerId } = req.body;

            const withdraw = await Withdraw.findByIdAndUpdate(
              req.params.id,
              {
                status: "succeed",
                updatedAt: Date.now(),
              },
              { new: true }
            );
      
            const seller = await Shop.findById(sellerId);
      
            const transection = {
              _id: withdraw._id,
              amount: withdraw.amount,
              updatedAt: withdraw.updatedAt,
              status: withdraw.status,
            };
      
            seller.transections = [...seller.transections, transection];
      
            await seller.save();
      
            try {
              await sendMail({
                email: seller.email,
                subject: "Payment confirmation",
                message: `Hello ${seller.name}, Your withdraw request of ${withdraw.amount}$ is on the way. Delivery time depends on your bank's rules it usually takes 3days to 7days.`,
              });
            } catch (error) {
                res.status(500);
                throw new Error(error.message);
            }
            res.status(201).json({
              success: true,
              withdraw,
            });
           
        } catch (error) {
            res.status(500);
            throw new Error(error.message);
        }
});








