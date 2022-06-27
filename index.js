require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const home = require("./routes/home/home");
const todos = require("./routes/todos/todos");
const auth = require("./routes/auth/auth");
const groups = require("./routes/groups/groups");

const PORT = process.env.PORT || 3000;
const DB_URI = process.env.MONGO_URI;
const app = express();

//start of: middleware uses
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
);
app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//end of: middleware uses

app.use("/api/", home);
app.use("/api/auth/", auth);
app.use("/api/todos/", todos);
app.use("/api/groups/", groups);

console.log("\nConnecting to database...");
mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("Connected to database.\n");
    app.listen(PORT, () => console.log(`Listening on port ${PORT}\n`));
  })
  .catch((error) => console.log(error));
