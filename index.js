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
const path = require("path");

const PORT = process.env.PORT || 3000;
const DB_URI = process.env.MONGO_URI;
const app = express();

//start of: middleware uses
app.use(
  cors({
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
);
app.use(express.json());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, "./client/build")));
//end of: middleware uses

app.use("/api/", home);
app.use("/api/auth/", auth);
app.use("/api/todos/", todos);
app.use("/api/groups/", groups);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

console.log("\nConnecting to database...");
mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("Connected to database.\n");
    app.listen(PORT, () => console.log(`Listening on port ${PORT}\n`));
  })
  .catch((error) => console.log(error));
