import mongoose, { mongo } from "mongoose";
const dburl =
  "mongodb+srv://shelkeadinath3:adiatmongodb@cluster0.1h6wkql.mongodb.net/?retryWrites=true&w=majority";
mongoose.set("strictQuery", true);
const connect =() => {
  try {
    mongoose.connect(dburl);
    console.log("Connected to Database");
  } catch (error) {
    console.log(error);
  }
};

export default connect;
