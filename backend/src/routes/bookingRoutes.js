import express from "express";
import bookingController from "../controllers/bookingController.js";

const router = express.Router();

router
  .route("/")
  .get(bookingController.getAllBookings)
  .post(bookingController.postBooking);

router
  .route("/:id")
  .get(bookingController.getBookingById)
  .put(bookingController.putBooking)
  .delete(bookingController.deleteBooking);

export default router;
