import mongoose from "mongoose";

const connectDatabase = () => {
  console.log("Wait, connecting to Database");
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB Atlas connected"))
    .catch((error) => console.log(error));
};

export default connectDatabase;
