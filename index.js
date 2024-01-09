import express from "express";
import dotenv from "dotenv";
import connectDatabasedb from "./src/database/db.js";

import userRoute from "./src/routes/user.route.js";
import authRoute from "./src/routes/auth.route.js";
import newsRoute from "./src/routes/news.route.js";

dotenv.config();
const port = process.env.port || 3000;
const app = express();

connectDatabasedb();
app.use(express.json());
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/news", newsRoute);
app.listen(port, () => console.log(`Server started at port ${port}`));
