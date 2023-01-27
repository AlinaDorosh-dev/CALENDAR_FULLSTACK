const mongoose = require('mongoose')
mongoose.set("strictQuery", true);
const mongoString = process.env.DATABASE_URL;
console.log(mongoString);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoString)

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB