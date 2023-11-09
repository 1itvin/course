require("dotenv").config();
const express = require("express");
const db = require("./config/db");
const usersRouter = require("./routes/users");
const hotelsRouter = require("./routes/hotels");
const roomsRouter = require("./routes/rooms");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/users", usersRouter);
app.use("/hotels", hotelsRouter);
app.use("/rooms", roomsRouter);

app.use((req, res, next) => {
	next({ message: "Not Found", statusCode: 404 });
});

app.use((err, req, res, next) => {
  res.status(err.statusCode).json({
    message: err.message,
  });
});

db.sync().then(() => {
  app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
});
