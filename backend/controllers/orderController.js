import asyncHandler from "express-async-handler";
import Order from '../models/orderModel.js';
import Shop from '../models/shopModel.js';
import Product from '../models/productModel.js';


// @desc    create event
// @route   POST /api/v2/order/get-all-orders/:userId
// @access  Public

export const  createOrder = asyncHandler(
    async (req, res, next) => {
        try {
          const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;
    
          //   group cart items by shopId
          const shopItemsMap = new Map();
    
          for (const item of cart) {
            const shopId = item.shopId;
            if (!shopItemsMap.has(shopId)) {
              shopItemsMap.set(shopId, []);
            }
            shopItemsMap.get(shopId).push(item);
          }
    
          // create an order for each shop
          const orders = [];
    
          for (const [shopId, items] of shopItemsMap) {
            const order = await Order.create({
              cart: items,
              shippingAddress,
              user,
              totalPrice,
              paymentInfo,
            });
            orders.push(order);
          }
    
          res.status(201).json({
            success: true,
            orders,
          });
        } catch (error) {
            res.status(500);
            throw new Error(error.message);
        }
});


// @desc    get all orders of user
// @route   GET /api/v2/order/get-all-orders/:userId
// @access  Public
export const  getUserOrdrs = asyncHandler(
    async (req, res, next) => {
        try {
          const orders = await Order.find({ "user._id": req.params.userId }).sort({
            createdAt: -1,
          });
    
          res.status(200).json({
            success: true,
            orders,
          });
        } catch (error) {
            res.status(500);
            throw new Error(error.message);
        }
      });

// @desc    get all orders of seller
// @route   GET /api/v2/order/get-seller-all-orders/:shopId
// @access  Public
export const  getShopOrdrsById = asyncHandler(
    async (req, res, next) => {
        try {
          const orders = await Order.find({
            "cart.shopId": req.params.shopId,
          }).sort({
            createdAt: -1,
          });
    
          res.status(200).json({
            success: true,
            orders,
          });
        } catch (error) {
            res.status(500);
            throw new Error(error.message);
        }
});

// @desc    update order status for seller
// @route   PUT /api/v2/order/update-order-status/:id
// @access  SELLER

export const  updateOrderStatus = asyncHandler(
    async (req, res, next) => {
        try {
          const order = await Order.findById(req.params.id);
    
          if (!order) {
            res.status(400);
            throw new Error("Order not found with this id");
          }
          if (req.body.status === "Transferred to delivery partner") {
            order.cart.forEach(async (o) => {
              await updateOrder(o._id, o.qty);
            });
          }
    
          order.status = req.body.status;
    
          if (req.body.status === "Delivered") {
            order.deliveredAt = Date.now();
            order.paymentInfo.status = "Succeeded";
            const serviceCharge = order.totalPrice * .10;
            await updateSellerInfo(order.totalPrice - serviceCharge);
          }
    
          await order.save({ validateBeforeSave: false });
    
          res.status(200).json({
            success: true,
            order,
          });
    
          async function updateOrder(id, qty) {
            const product = await Product.findById(id);
    
            product.stock -= qty;
            product.sold_out += qty;
    
            await product.save({ validateBeforeSave: false });
          }
    
          async function updateSellerInfo(amount) {
            const seller = await Shop.findById(req.seller.id);
            
            seller.availableBalance = amount;
    
            await seller.save();
          }
        } catch (error) {
            res.status(500);
            throw new Error(error.message);
        }
      });

// @desc    Give a refund ----- user
// @route   PUT /api/v2/order/order-refund/:id"
// @access  SELLER

export const  giveRefund = asyncHandler(
    async (req, res, next) => {
        try {
          const order = await Order.findById(req.params.id);
    
          if (!order) {
            res.status(400);
            throw new Error("Order not found with this id");
          }
    
          order.status = req.body.status;
    
          await order.save({ validateBeforeSave: false });
    
          res.status(200).json({
            success: true,
            order,
            message: "Order Refund Request successfully!",
          });
        } catch (error) {
            res.status(500);
            throw new Error(error.message);
        }
      });

// @desc    Give a refund ----- user
// @route   PUT /api/v2/order/order-refund-success/:id
// @access  SELLER

export const  acceptRefund = asyncHandler(
    async (req, res, next) => {
        try {
          const order = await Order.findById(req.params.id);
    
          if (!order) {
            res.status(400);
            throw new Error("Order not found with this id");
          }
    
          order.status = req.body.status;
    
          await order.save();
    
          res.status(200).json({
            success: true,
            message: "Order Refund successfull!",
          });
    
          if (req.body.status === "Refund Success") {
            order.cart.forEach(async (o) => {
              await updateOrder(o._id, o.qty);
            });
          }
    
          async function updateOrder(id, qty) {
            const product = await Product.findById(id);
    
            product.stock += qty;
            product.sold_out -= qty;
    
            await product.save({ validateBeforeSave: false });
          }
        } catch (error) {
            res.status(500);
            throw new Error(error.message);
        }
      });


// @desc    all orders --- for admin
// @route   PUT /api/v2/order/admin-all-orders
// @access  Admin
export const  getOrders = asyncHandler(
    async (req, res, next) => {
        try {
          const orders = await Order.find().sort({
            deliveredAt: -1,
            createdAt: -1,
          });
          res.status(201).json({
            success: true,
            orders,
          });
        } catch (error) {
            res.status(500);
            throw new Error(error.message);
        }
      });
