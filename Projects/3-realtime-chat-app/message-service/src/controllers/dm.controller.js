import DMMessage from "../models/DMMessage.js";

export const getMessages = async (req, res) => {
  try {
    const userA = req.params.senderId;
    const userB = req.params.userId;

    if (!userA || !userB) {
        return res.status(400).json({ 
            message: "Missing user ids"
        });
    }

    const messages = await DMMessage.find({
      $or: [
        { senderId: userA, receiverId: userB },
        { senderId: userB, receiverId: userA },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json({
      messages
    });
  } catch (err) {
    res.status(401).json({
      message: "Not Possible to get the messages, please try again",
    });
  }
};

export const postMessage = async (req, res) => {
  try {
    const receiverId = req.params.userId;
    const { senderId, text } = req.body;

    if(!receiverId || !senderId || !text) {
        return res.status(400).json({
            message : "missing either senderid or receiverid or text"
        })
    }

    const msg = await DMMessage.create({
      senderId,
      receiverId: userId,
      text,
    });
    res.status(201).json({
      message: "The message has been stored in the database",
      msg,
    });
  } catch (err) {
    res.status(401).json({
      message: "Posting the message in the DB failed",
    });
  }
};
