const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoutes");
const noteRoute = require("./routes/noteRoutes");

const app = express();
dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/v1/user", userRoute);
app.use("/v1/note", noteRoute);

const PORT = process.env.PORT || 5005;
app.listen(PORT, console.log(`Server started on PORT ${PORT}`));
