import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {Image } from "../models/image.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import sharp from "sharp";
import fs from 'fs';

const compressor = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, 'Image file is required');
  }

  const imgPath = req.file.path;
  const outputImgPath = `${imgPath}.compressed.jpg`;

  await sharp(imgPath)
  .jpeg({ quality: 50 }) // Adjust quality as needed (80 is just an example)
  .toFile(outputImgPath);


  const imgFile=await uploadOnCloudinary(outputImgPath)

  await fs.promises.unlink(imgPath);

  if (!imgFile) {
    throw new ApiError(400, 'Failed to upload image to Cloudinary');
  }

  const newImage=await Image.create({
    imgFile:imgFile.url,
    size:imgFile.bytes
  })

  return res
    .status(201)
    .json(new ApiResponse(200, newImage, "Successfull"));
  
});

export { compressor };
