import express from 'express';
import { isAuthenticated,isAdmin,isSeller } from '../middleware/authMiddleware.js';
import {
    createProduct,
    getShopProductsByShopId,
    deleteProductById,
    getProducts,
    createProductReview,
    getAllProducts,
    getProductById

} from '../controllers/productController.js'

const router = express.Router();

// create product
router.post("/create-product",createProduct);

// get all products of a shop
router.get("/get-all-products-shop/:id",getShopProductsByShopId);

// @desc    Get all products
// @route   GET /api/v2/product/:id
// @access  public
router.get("/:id",getProductById);


// delete product of a shop
router.delete("/delete-shop-product/:id",isSeller,deleteProductById);


// get all products
router.get("/get-all-products",getProducts);

// review for a product
router.put("/create-new-review",isAuthenticated,createProductReview);

// all products --- for admin
router.get( "/admin-all-products",
    isAuthenticated,
    isAdmin("Admin"),
    getAllProducts)




export default router;