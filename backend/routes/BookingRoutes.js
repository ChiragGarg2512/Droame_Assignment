const express = require("express"); // importing the express npm package
const router = express.Router(); // uses the router function of express

// Using functions defined in '../controllers/BookingController'
const {
  getBooking,
  createBooking,
  deleteBooking,
  editBooking,
} = require("../controllers/BookingController");

// get http methods for fetching the Booking database based on customerID
router.get("/:customer", getBooking);

// post http method used to create a booking in database
router.post("", createBooking);

// delete http method used to delete a booking by its ID
router.delete("/:_id", deleteBooking);

// put http method used to edit the booking information
router.put("/:_id", editBooking);

module.exports = router;
