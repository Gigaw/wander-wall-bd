import { Router } from "express";
import tourController from "../controller/tour.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = new Router();

router.get("/tours", authMiddleware,  tourController.getTours);
router.get("/tours/:id", authMiddleware, tourController.getTour);
router.post("/tours",authMiddleware, tourController.createTour);
router.delete("/tours/:id",authMiddleware, tourController.deleteTour);
router.put("/tours/:id", authMiddleware, tourController.updateTour);


const tourRouter = router;

export default tourRouter;