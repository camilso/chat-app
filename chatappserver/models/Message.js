const { model, Schema } = require("mongoose");

const messageSchema = new Schema(
  {
    content: {
      type: String,
    },
    senderName: {
      type: String,
    },
    room: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = model("messages", messageSchema);
