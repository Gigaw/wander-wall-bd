import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import bookingController from "../controller/booking.controller.js";

const router = new Router();

router.get("/bookings", bookingController.getBookings);
router.post("/bookings", authMiddleware(), bookingController.createBooking);
router.post("/bookings/approve/:id", authMiddleware('admin'), bookingController.approveBooking);
router.post("/bookings/reject/:id", authMiddleware('admin'), bookingController.rejectBooking);
router.get("/bookings/by-tour-id/:tour_id", authMiddleware(), bookingController.getBooking);
const bookingRouter = router;

export default bookingRouter;
