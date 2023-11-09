module.exports = function (sequelize, DataTypes) {
  const Room = sequelize.define(
    "Room",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      img: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      tableName: "rooms",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
      deletedAt: false,
      paranoid: false,
    }
  );

  return Room;
};
