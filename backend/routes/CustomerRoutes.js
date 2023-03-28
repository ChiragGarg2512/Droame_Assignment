const express = require("express"); // importing the express npm package
const router = express.Router(); // uses the router function of express

// Using functions defined in '../controllers/CustomerController'
const {
  getCustomers,
  createCustomer,
  deleteCustomer,
  editCustomer,
} = require("../controllers/CustomerController");

// get http methods for fetching the Customer database
router.get("", getCustomers);

// post http method used to create a customer in database
router.post("", createCustomer);

// delete http method used to delete a customer by their ID
router.delete("/:_id", deleteCustomer);

// put http method used to edit the user information
router.put("/:_id", editCustomer);

module.exports = router;
