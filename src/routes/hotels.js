const express = require("express");
const { Hotel, HotelReview, Room } = require("../models");

const router = express.Router();

// Get All Hotels
router.route("/").get(async (req, res, next) => {
  try {
    const allHotels = await Hotel.findAll();
    res.status(200).json({ data: allHotels });
  } catch (err) {
    next({ message: "Error occured while getting hotels", statusCode: 500 });
  }
});

// Get Hotel by ID
router.route("/:id").get(async (req, res, next) => {
  try {
    const { id } = req.params;
    const hotel = await Hotel.findOne({
      where: {
        id,
      },
    });
    if (!hotel) {
      next({ message: "Hotel not found", statusCode: 400 });
    }
    res.status(200).json({ data: hotel });
  } catch (err) {
    next({
      message: "Error occured while getting hotel by id",
      statusCode: 500,
    });
  }
});

// Add Hotel
router.route("/").post(async (req, res, next) => {
  try {
    const { img, name, description } = req.body;
    await Hotel.create({ img, name, description });
    res.status(201).json({
      message: "Hotel has been created",
    });
  } catch (err) {
    next({ message: "Error occured while adding hotel", statusCode: 500 });
  }
});

// Delete Hotel
router.route("/:id").delete(async (req, res, next) => {
  try {
    const { id } = req.params;
    await Hotel.destroy({
      where: {
        id,
      },
    });
    res.status(200).json({
      message: "Hotel has been deleted",
    });
  } catch (err) {
    next({ message: "Error occured while removing hotel", statusCode: 500 });
  }
});

// Get HotelReviews of Hotel
router.get("/:id/reviews", async (req, res, next) => {
  try {
    const { id: hotelId } = req.params;
    const reviews = await HotelReview.findAll({
      where: {
        hotel_id: hotelId,
      },
    });
    res.status(200).json({ data: reviews });
  } catch (err) {
    next({
      message: "Error occured while getting hotel reviews",
      statusCode: 500,
    });
  }
});

// Add Hotel Review to Hotel
router.post("/:id/reviews", async (req, res, next) => {
  try {
    const { id: hotelId } = req.params;
    const { userId, content, stars } = req.body;
    await HotelReview.create({
      hotel_id: hotelId,
      user_id: userId,
      content,
      stars,
    });
    res.status(201).json({ message: "Review has been added" });
  } catch (err) {
    console.log(err);
    next({
      message: "Error occured while adding hotel review",
      statusCode: 500,
    });
  }
});

// Get Rooms of Hotel
router.route("/:id/rooms").get(async (req, res, next) => {
  try {
    const { id: hotelId } = req.params;
    const hotelRooms = await Room.findAll({
      where: {
        hotel_id: hotelId,
      },
    });
    res.status(200).json({ data: hotelRooms });
  } catch (err) {
    next({
      message: "Error occured while getting hotel rooms",
      statusCode: 500,
    });
  }
});

module.exports = router;
