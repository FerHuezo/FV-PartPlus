import bookingModel from "../models/Booking.js";

const bookingsController = {};

bookingsController.getAllBookings = async (req, res) => {
  try {
    const bookings = await bookingModel.find().populate("clientId");
    res.status(200).json(bookings);
  } catch (error) {
    console.log("error: " + error);
    res.status(500).json({ message: "internal server error" });
  }
};

bookingsController.getBookingById = async (req, res) => {
  try {
    const booking = await bookingModel.findById(req.params.id).populate("clientId");
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (error) {
    console.log("error: " + error);
    res.status(500).json({ message: "internal server error" });
  }
};

bookingsController.postBooking = async (req, res) => {
  try {
    const { clientId, vehicle, service, status } = req.body;

    if (!clientId || !vehicle || !service || !status) {
      return res.status(400).json({
        message: "Asegúrate de que todos los campos solicitados estén llenos",
      });
    }

    const newBooking = new bookingModel({ clientId, vehicle, service, status });
    await newBooking.save();

    res.status(201).json({
      message: "Reserva creada exitosamente",
      booking: newBooking,
    });
  } catch (error) {
    console.error("error: " + error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

bookingsController.deleteBooking = async (req, res) => {
  try {
    const deleted = await bookingModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ message: "Reserva eliminada correctamente" });
  } catch (error) {
    console.log("error: " + error);
    res.status(500).json({ message: "internal server error" });
  }
};

bookingsController.putBooking = async (req, res) => {
  try {
    const { clientId, vehicle, service, status } = req.body;

    if (!clientId || !vehicle || !service || !status) {
      return res.status(400).json({
        message: "Asegúrate de que todos los campos solicitados estén llenos",
      });
    }

    const updated = await bookingModel.findByIdAndUpdate(
      req.params.id,
      { clientId, vehicle, service, status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Reserva actualizada", booking: updated });
  } catch (error) {
    console.log("error: " + error);
    res.status(500).json({ message: "internal server error" });
  }
};

export default bookingsController;
