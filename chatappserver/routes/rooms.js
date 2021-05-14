const router = require("express").Router();
const Room = require("../models/Rooms");
//create new room
router.post("/", async (req, res) => {
  try {
    const newRoom = new Room({
      roomName: req.body.roomName,
      desc: req.body.desc,
    });
    const room = await newRoom.save();
    res.status(200).json(room);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
