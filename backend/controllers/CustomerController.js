// Used for importing database
const Customer = require("../models/CustomerSchema");
const Booking = require("../models/BookingSchema");

/*
 @desc customer is created with the information sent through the request body
 @API POST /customer
 */
const createCustomer = async (req, res) => {
  try {
    const newCustomer = new Customer(req.body);
    await newCustomer.save();

    const customers = await Customer.find().select("-__v");
    res.status(201).send(customers);
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "Cannot fetch!" });
  }
};

/*
 @desc getCustomers gives every customer in the database as the output
 @API  GET /customer
 */
const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().select("-__v");
    res.send(customers);
  } catch (e) {
    res.status(500).send({ error: "Cannot fetch!" });
  }
};

/*
 @desc editCustomer is used to find a particular customer by id and update the fields provided in the request body
 @API  PUT /customer
 */
const editCustomer = async (req, res) => {
  try {
    await Customer.findByIdAndUpdate(req.params._id, req.body);

    const customers = await Customer.find().select("-__v");
    res.send(customers);
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "No customer Found" });
  }
};

/*
 @desc deleteCustomer is used to delete the customer  
 @API  DELETE /customer
 */
const deleteCustomer = async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params._id);
    await Booking.deleteMany({ customer: req.params._id });

    const customers = await Customer.find().select("-__v");
    res.send(customers);
  } catch (e) {
    res.status(500).send({ error: "Customer Not Found" });
  }
};

module.exports = { getCustomers, deleteCustomer, createCustomer, editCustomer };
