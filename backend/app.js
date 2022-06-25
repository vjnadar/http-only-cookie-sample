const express = require("express");
const path = require("path");
const app = express();
const authRoutes = require("./routes/auth");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

/*this line sets the cors value. The origin is the url of your frontend. 
The attribute 'credentials' must always be true in order to receive/send a HTTPOnly cookie*/
const corsVal = process.env.NODE_ENV !== "DEV" ? { origin: "", credentials: true } : { origin: "http://localhost:3000", credentials: true };
app.use(cors(corsVal));
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS,GET,POST,PUT,PATCH,DELETE");
    res.setHeader("Access-Control-Allow-Header", "Set-Cookie");
    next();
});
app.use("/auth", authRoutes);
app.use((error, req, res, next) => {
    console.log("Main Error Control");
    console.log(error);
    const statusCode = error.statusCode || 500;
    const message = error.message;
    const data = error.data || error;
    res.status(statusCode).json({ message: message, data: data });
});
app.listen(8080, () => {
    console.log("Connected");
});
