const mongoose = require("mongoose"); // importing mongoose package

const connectDB = async () => {
    try {
        mongoose.set("strictQuery", false);
        const conn = await mongoose.connect('mongodb+srv://chiraggarg2512:Evolution123@cluster0.o4wh4zr.mongodb.net/Droame?retryWrites=true&w=majority');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
};

module.exports = connectDB;