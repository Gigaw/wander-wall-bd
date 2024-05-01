import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import bookingController from "../controller/booking.controller.js";

const router = new Router();

router.get("/bookings", bookingController.getBookings);
router.post("/bookings", authMiddleware, bookingController.createBooking);
router.get("/bookings/by-tour-id/:tour_id", bookingController.getBooking);
const bookingRouter = router;

export default bookingRouter;
