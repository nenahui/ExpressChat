import express from 'express';
import fileDb from './fileDb';
import messageRouter from './routers/messages';
import cors from 'cors';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use('/messages', messageRouter);

const run = async () => {
  await fileDb.init();

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });
};

run().catch((e) => {
  console.error(e);
});
