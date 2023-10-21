import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import sendToken from '../utils/jwtToken.js';
import sendMail from '../utils/sendMail.js';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

// create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// @desc    Create a new user **** ok
// @route   POST /api/v2/user/create-user"
// @access  Public
export const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, avatar } = req.body;
  console.log({ name, email, password, avatar });

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }
    /*  const myCloud = await cloudinary.v2.uploader.upload(req.file, {
      folder: "avatars",
    }); */

    const user = {
      name: name,
      email: email,
      password: password,
      avatar: avatar,
    };

    let activationToken = createActivationToken(user);
    activationToken = activationToken.replace('.', '_p_');
    activationToken = activationToken.replace('.', '_p_');

    const activationUrl = `http://localhost:3000/activation/${activationToken}`;

    /*  let activationToken = createActivationToken(user);
    let activation_token = activationToken.replace(".", "_p_");
    activation_token = activation_token.replace(".", "_p_");

    const activationUrl = `https://qjx3hk-3000.csb.app/activation/${activation_token}`;
 */
    try {
      await sendMail({
        email: user.email,
        subject: 'Activate your account',
        message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `please check your email:- ${user.email} to activate your account!`,
      });
    } catch (error) {
      res.status(500);
      throw new Error(error.message);
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// @desc    Activate and Register a new user *****ok
// @route   POST /api/v2/user/activation
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  try {
    const { activation_token } = req.body;

    const newUser = jwt.verify(activation_token, process.env.JWT_SECRET);

    if (!newUser) {
      res.status(400);
      throw new Error('Invalid token');
    }

    const { name, email, password, avatar } = newUser;

    let user = await User.findOne({ email });

    if (user) {
      res.status(400);
      throw new Error('User already exists');
    }

    user = await User.create({
      name,
      email,
      avatar,
      password,
    });

    sendToken(user, 201, res);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// @desc    Login user & get token ****ok
// @route   POST /api/v2/user//login-user
// @access  Public
export const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error('Please provide the all fields!');
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      res.status(400);
      throw new Error("User doesn't exists!");
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      res.status(400);
      throw new Error('Please provide the correct information');
    }

    sendToken(user, 201, res);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// @desc    Get user profile
// @route   GET /api/v2/user/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(400);
      throw new Error("User doesn't exists");
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/v2/user/logout
// @access  Private
export const logoutUser = (req, res) => {
  try {
    res.cookie('token', null, {
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
};

// @desc    Update user profile
// @route   PUT /api/v2/user/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  
  try {
    const { email, password, phoneNumber, name } = req.body;
    console.log(req.body)

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      res.status(400);
      throw new Error('User not found');
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      res.status(400);
      throw new Error('Please provide the correct information');
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.phoneNumber = phoneNumber || user.phoneNumber;

    await user.save();

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// @desc    update user avatar
// @route   PUT /api/v2/user/update-avatar
// @access  Private
export const updateUserAvatar = asyncHandler(async (req, res, next) => {
  try {
    let existsUser = await User.findById(req.user._id);
    console.log(req.file);
    if (req.file) {
      const imageId = existsUser.avatar.public_id;
      

      await cloudinary.uploader.destroy(imageId);
      const streamUpload = (req) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream({
            folder: "avatars",
            width: 150,
          },(error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          });
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
      };
      const myCloud = await streamUpload(req);

      /* const myCloud = await cloudinary.uploader.upload(req.file, {
        folder: 'avatars',
        width: 150,
      }); */
      console.log(myCloud);
      existsUser.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    await existsUser.save();
    console.log(existsUser)

    res.status(200).json({
      success: true,
      user: existsUser,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// @desc    update user addresses
// @route   PUT /api/v2/user/update-user-addresses
// @access  Private
export const updateUserAddresses = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      const sameTypeAddress = user.addresses.find(
        (address) => address.addressType === req.body.addressType
      );

      if (sameTypeAddress) {
        throw new Error(`${req.body.addressType} address already exists`);
      }
      const existsAddress = user.addresses.find(
        (address) => address._id === req.body._id
      );
      if (existsAddress) {
        Object.assign(existsAddress, req.body);
      } else {
        // add the new address to the array
        user.addresses.push(req.body);
      }
      await user.save();

      res.status(200).json({
        success: true,
        user,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// @desc    delete user address
// @route   DELETE /api/v2/user/delete-user-address/:id
// @access  Private
export const deleteUserAddress = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const addressId = req.params.id;

    await User.updateOne(
      {
        _id: userId,
      },
      { $pull: { addresses: { _id: addressId } } }
    );

    const user = await User.findById(userId);

    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

// @desc    update user password
// @route   PUT /api/v2/user/update-user-password
// @access  Private
export const updateUserPassword = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('+password');

    const isPasswordMatched =
      user && (await user.matchPassword(req.body.oldPassword));

    if (!isPasswordMatched) {
      res.status(400);
      throw new Error('Old password is incorrect!');
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      res.status(400);
      throw new Error("Password doesn't matched with each other!");
    }
    user.password = req.body.newPassword;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password updated successfully!',
    });
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

// @desc    Find user infoormation with the userId
// @route   GET /api/v2/user/user-info/:id
// @access  public
export const getUserInfo = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(201).json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

// @desc    Get  all users --- for admin
// @route   GET /api/v2/user/admin-all-users
// @access  Private AdminRoot
export const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find().sort({
      createdAt: -1,
    });
    res.status(201).json({
      success: true,
      users,
    });
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

// @desc    DELETE  delete users --- admin
// @route   DELETE /api/v2/user/delete-user/:id
// @access  Private AdminRoot
export const deleteUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(400);
      throw new Error('User is not available with this id');
    }

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    await User.findByIdAndDelete(req.params.id);

    res.status(201).json({
      success: true,
      message: 'User deleted successfully!',
    });
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});
