import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import sendMail from '../utils/sendMail.js';
import sendShopToken from '../utils/shopToken.js';
import Shop from '../models/shopModel.js';
import cloudinary from 'cloudinary';

// create activation token
const createActivationToken = (seller) => {
  return jwt.sign(seller, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// @desc     create shop
// @route   POST /api/v2/shop/create-shop
// @access  Public
export const createShop = asyncHandler(async (req, res, next) => {
  try {
    const { 
      name,
      email,
      password,
      zipCode,
      address,
      phoneNumber,} = req.body;
    const sellerEmail = await Shop.findOne({ email });
    if (sellerEmail) {
      return next(new ErrorHandler('User already exists', 400));
    }

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: 'avatars',
    });

    const seller = {
      name,
      email,
      password,
      zipCode,
      address,
      phoneNumber,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    };

    const activation_token = createActivationToken(seller);
    let activationToken = activation_token.replace('.', '_p_');
    activationToken = activationToken.replace('.', '_p_');

    const activationUrl = `http://localhost:3000/seller/activation/${activationToken}`;

    try {
      await sendMail({
        email: seller.email,
        subject: 'Activate your Shop',
        message: `Hello ${seller.name}, please click on the link to activate your shop: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `please check your email:- ${seller.email} to activate your shop!`,
      });
    } catch (error) {
      res.status(500);
      throw new Error(error.message);
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// @desc    Activate Seller
// @route   POST /api/v2/shop/activation
// @access  Public
export const activateShop = asyncHandler(async (req, res, next) => {
  try {
    const { activation_token } = req.body;

    const newSeller = jwt.verify(activation_token, process.env.JWT_SECRET);
    console.log(newSeller);
    if (!newSeller) {
      res.status(400);
      throw new Error('Invalid token');
    }
    const { name, email, password, avatar, zipCode, address, phoneNumber } =
      newSeller;
console.log({ name, email, password, avatar, zipCode, address, phoneNumber })
    let seller = await Shop.findOne({ email });

    if (seller) {
      res.status(400);
      throw new Error('Seller already exists');
    }

    seller = await Shop.create({
      name,
      email,
      avatar,
      password,
      zipCode,
      address,
      phoneNumber,
    });
    sendShopToken(seller, 201, res);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// @desc    Login shop
// @route   POST /api/v2/shop/login-shop
// @access  Public
export const loginShop = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error('Please provide the all fields!');
    }

    const shop = await Shop.findOne({ email }).select('+password');

    if (!shop) {
      res.status(400);
      throw new Error("Shop doesn't exists!");
    }

    const isPasswordValid = await shop.comparePassword(password);

    if (!isPasswordValid) {
      res.status(400);
      throw new Error('Please provide the correct information');
    }

    sendShopToken(shop, 201, res);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// @desc    Load shop
// @route   GET /api/v2/shop/getSeller
// @access  Public
export const getSeller = asyncHandler(async (req, res, next) => {
  try {
    const seller = await Shop.findById(req.seller._id);

    if (!seller) {
      res.status(400);
      throw new Error("Saller doesn't exists");
    }

    res.status(200).json({
      success: true,
      seller,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// @desc    Log out from shop
// @route   POST /api/v2/shop/logout
// @access  Public
export const shopLogout = asyncHandler(async (req, res, next) => {
  try {
    res.cookie('seller_token', null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    res.status(201).json({
      success: true,
      message: 'Log out successful!',
    });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// @desc     Get shop info
// @route   GET /api/v2/shop/get-shop-info/:id
// @access  Public
export const getShopInfoById = asyncHandler(async (req, res, next) => {
  try {
    const shop = await Shop.findById(req.params.id);
    res.status(201).json({
      success: true,
      shop,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// @desc    update shop profile picture
// @route   POST /api/v2/shop/update-shop-avatar
// @access  Public
export const updateShopAvatar = asyncHandler(async (req, res, next) => {
  try {
    let existsSeller = await Shop.findById(req.seller._id);

    const imageId = existsSeller.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: 'avatars',
      width: 150,
    });

    existsSeller.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };

    await existsSeller.save();

    res.status(200).json({
      success: true,
      seller: existsSeller,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// @desc    update seller info
// @route   POST /api/v2/shop/update-seller-info
// @access  Public
export const updateSellerInfo = asyncHandler(async (req, res, next) => {
  try {
    const { name, description, address, phoneNumber, zipCode } = req.body;

    const shop = await Shop.findOne(req.seller._id);

    if (!shop) {
      res.status(400);
      throw new Error('Seller not found');
    }

    shop.name = name;
    shop.description = description;
    shop.address = address;
    shop.phoneNumber = phoneNumber;
    shop.zipCode = zipCode;

    await shop.save();

    res.status(201).json({
      success: true,
      shop,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// @desc    All sellers --- for admin
// @route   GET /api/v2/shop/admin-all-sellers
// @access  Admin
export const getAllSeller = asyncHandler(async (req, res, next) => {
  try {
    const sellers = await Shop.find().sort({
      createdAt: -1,
    });
    res.status(201).json({
      success: true,
      sellers,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// @desc    Delete seller ---admin
// @route   DELETE /api/v2/shop/create-shop
// @access  Admin
export const deleteSellerById = asyncHandler(async (req, res, next) => {
  try {
    const seller = await Shop.findById(req.params.id);

    if (!seller) {
      res.status(400);
      throw new Error('Seller is not available with this id');
    }

    await Shop.findByIdAndDelete(req.params.id);

    res.status(201).json({
      success: true,
      message: 'Seller deleted successfully!',
    });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// @desc    Update seller withdraw methods --- sellers
// @route   PUT /api/v2/shop/update-payment-methods
// @access  seller
export const updatePaymentMethods = asyncHandler(async (req, res, next) => {
  try {
    const { withdrawMethod } = req.body;

    const seller = await Shop.findByIdAndUpdate(req.seller._id, {
      withdrawMethod,
    });

    res.status(201).json({
      success: true,
      seller,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// @desc     create shop deleteWithdrawMethod
// @route   Delete /api/v2/shop/delete-withdraw-method
// @access  Public
export const deleteWithdrawMethod = asyncHandler(async (req, res, next) => {
  try {
    const seller = await Shop.findById(req.seller._id);

    if (!seller) {
      res.status(400);
      throw new Error('Seller not found with this id');
    }

    seller.withdrawMethod = null;

    await seller.save();

    res.status(201).json({
      success: true,
      seller,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});
