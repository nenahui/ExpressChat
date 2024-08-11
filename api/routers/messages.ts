import express from 'express';
import fileDb from '../fileDb';
const messageRouter = express.Router();

messageRouter.get('/', async (req, res) => {
  const messages = await fileDb.getItems();

  return res.send(messages);
});

messageRouter.post('/', async (req, res) => {
  if (!req.body.author || !req.body.message) {
    return res.status(400).send({ error: 'Author and message fields are required' });
  }

  const message = {
    message: req.body.message,
    author: req.body.author,
  };

  const savedMessage = await fileDb.addItem(message);

  return res.send(savedMessage);
});

export default messageRouter;
