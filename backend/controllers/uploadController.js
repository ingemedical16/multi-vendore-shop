import asyncHandler from "express-async-handler";
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';


// @desc    upload Avatar 
// @route   POST /api/v2/upload/avatar
// @access  public
export const uploadUserAvatar = asyncHandler(async (req, res) => {
    
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
      const result = await streamUpload(req);
      res.send(result);
    }
);