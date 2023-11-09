module.exports = function (sequelize, DataTypes) {
  const HotelReview = sequelize.define(
    "HotelReview",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stars: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      tableName: "hotel_reviews",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
      deletedAt: false,
      paranoid: false,
    }
  );

  return HotelReview;
};
