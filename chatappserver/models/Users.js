const { model, Schema } = require("mongoose");

const usersSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      min: 6,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = model("users", usersSchema);
