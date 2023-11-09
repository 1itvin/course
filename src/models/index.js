const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = require("../models/User")(sequelize, DataTypes);
const Room = require("../models/Room")(sequelize, DataTypes);
const Hotel = require("../models/Hotel")(sequelize, DataTypes);
const HotelReview = require("../models/HotelReview")(sequelize, DataTypes);
const models = { User, Room, Hotel, HotelReview };

models.sequelize = sequelize;
models.Sequelize = Sequelize;

// User can have multiple HotelReviews (One:Many)
User.hasMany(HotelReview, {
  foreignKey: {
    type: DataTypes.INTEGER,
    allowNull: false,
    name: "user_id",
  },
  sourceKey: "id",
});

// Hotel can have multiple HotelReviews (One:Many)
Hotel.hasMany(HotelReview, {
  foreignKey: {
    type: DataTypes.INTEGER,
    allowNull: false,
    name: "hotel_id",
  },
  sourceKey: "id",
});

// Hotel can have multiple Rooms (One:Many)
Hotel.hasMany(Room, {
  foreignKey: {
    type: DataTypes.INTEGER,
    allowNull: false,
    name: "hotel_id",
  },
  sourceKey: "id",
});

module.exports = models;
