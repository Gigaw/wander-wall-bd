import { Router } from "express";
import tourController from "../controller/tour.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import Multer from "multer";

const storage = Multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "tour-images/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = Multer({ storage: storage });
const router = new Router();

router.get("/tours", tourController.getTours);
router.get("/tours/:id", authMiddleware, tourController.getTour);
router.post(
  "/tours/upload-img/:id",
  upload.single("image"),
  tourController.uploadTourImage
);
router.post("/tours", authMiddleware, tourController.createTour);
router.delete("/tours/:id", authMiddleware, tourController.deleteTour);

const tourRouter = router;

export default tourRouter;
