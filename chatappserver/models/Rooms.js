const { model, Schema } = require("mongoose");

const roomSchema = new Schema({
  roomName: {
    type: String,
    min: 3,
    require: true,
    unique: true,
  },
  desc: {
    type: String,
    require: true,
  },
});

module.exports = model("rooms", roomSchema);
