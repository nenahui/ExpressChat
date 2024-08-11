import express from 'express';
import fileDb from '../fileDb';
const messageRouter = express.Router();

messageRouter.get('/', async (req, res) => {
  const messages = await fileDb.getItems();

  if (req.query.datetime) {
    const queryDate = req.query.datetime as string;
    const date = new Date(queryDate);
    if (isNaN(date.getDate())) {
      return res.status(400).send({ error: 'Invalid datetime' });
    }

    if (messages[messages.length - 1].createdAt > queryDate) {
      return res.send(messages.filter((item) => item.createdAt > queryDate));
    } else {
      return res.send([]);
    }
  }

  return res.send(messages.slice(-30));
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
