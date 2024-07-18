import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { compressor } from "../controllers/compressor.controller.js";

const router=Router();

router.route("/compress-img").post(
    upload.single('imgFile'),compressor
);

export default router