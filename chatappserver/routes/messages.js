const router = require("express").Router();
const Message = require("../models/Message");

router.put("/delete/:content", async (req, res) => {
  try {
    const mess = await Message.findOne({ content: req.params.content });
    await mess.updateOne({ $set: req.body });
    res.status(200).json(true);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/new", async (req, res) => {
  try {
    const newMessage = new Message({
      content: req.body.content,
      senderName: req.body.senderName,
      room: req.body.room,
      isDeleted: req.body.isDeleted,
    });
    const message = await newMessage.save();
    res.status(200).json(message);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:name", async (req, res) => {
  try {
    const messages = await Message.find({ room: req.params.name });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
