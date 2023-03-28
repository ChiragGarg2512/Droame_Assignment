const express = require("express"); // imports the express package
const cors = require("cors"); // import the cors npm package
const connectDB = require("./config/db"); // For database connection
connectDB(); // connects to the database

const app = express();
const PORT = 8000;

//
app.use(express.json());
app.use(cors());
app.use("/customer", require("./routes/CustomerRoutes"));
app.use("/booking", require("./routes/BookingRoutes"));

app.listen(PORT, () => {
  console.log(`Connected to port ${PORT}`);
});
