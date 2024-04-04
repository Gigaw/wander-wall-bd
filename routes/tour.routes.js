import { Router } from "express";
import tourController from "../controller/tour.controller.js";

const router = new Router();

router.get("/tours", tourController.getTours);
router.get("/tours/:id", tourController.getTour);
router.post("/tours", tourController.createTour);
router.delete("/tours/:id", tourController.deleteTour);
router.put("/tours/:id", tourController.updateTour);


const tourRouter = router;

export default tourRouter;