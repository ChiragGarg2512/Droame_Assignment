// Used for importing database
const Booking = require("../models/BookingSchema");

/*
 @desc getBooking function fetches booking belonging to a customerID
 @API  GET /booking
 */
const getBooking = async (req, res) => {
  try {
    const bookings = await Booking.find({ customer: req.params.customer });
    res.send(bookings);
  } catch (e) {
    res.status(500).send({ error: "Cannot fetch!" });
  }
};

/*
 @desc createBooking is used to create a booking for a customerID for a specific location and DroneShot
 @API  POST /booking
 */
const createBooking = async (req, res) => {
  try {
    const customer = req.body.customer;
    const booking = new Booking(req.body);
    await booking.save();

    const bookings = await Booking.find({ customer });
    res.status(201).send(bookings);
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "Cannot fetch!" });
  }
};

/*
 @desc deleteBooking is used to delete booking for a particular bookingID
 @API  DELETE /booking
 */
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params._id);

    const bookings = await Booking.find({ customer: booking.customer });
    res.status(200).send(bookings);
  } catch (e) {
    res.send({ error: "Booking not available" });
  }
};

/*
 * @desc editBooking edits the Booking for a bookingID
 * @API  PUT /booking
 */
const editBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params._id, req.body, {
      new: true,
    });

    const bookings = await Booking.find({ customer: booking.customer });
    res.status(200).send(bookings);
  } catch (e) {
    res.send({ error: "Booking not Available" });
  }
};

module.exports = { getBooking, createBooking, deleteBooking, editBooking };
