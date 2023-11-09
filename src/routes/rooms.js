const express = require("express");
const { Room } = require("../models");

const router = express.Router();

// Add Room
router.route("/").post(async (req, res, next) => {
  try {
    const { hotelId, img, type, price } = req.body;
    await Room.create({
      hotel_id: hotelId,
      img,
      type,
      price,
    });
    res.status(201).json({ message: "Room has been created" });
  } catch (err) {
    next({ message: "Error occured while adding room", statusCode: 500 });
  }
});

// Delete Room
router.route("/:id").delete(async (req, res, next) => {
  try {
    const { id } = req.params;
    await Room.destroy({
      where: {
        id,
      },
    });
    res.status(200).json({ message: "Room has been deleted" });
  } catch (err) {
    next({ message: "Error occured while removing room", statusCode: 500 });
  }
});

module.exports = router;
