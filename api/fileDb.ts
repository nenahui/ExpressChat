import { promises as fs } from 'fs';
import { type IMessage, type TMessageMutation } from './types';

const filename = './db.json';
let data: IMessage[] = [];

const fileDb = {
  async init() {
    try {
      const fileContents = await fs.readFile(filename);
      data = JSON.parse(fileContents.toString());
    } catch (e) {
      data = [];
    }
  },
  async getItems() {
    return data;
  },
  async addItem(item: TMessageMutation) {
    const id = crypto.randomUUID();
    const date = new Date().toISOString();

    const message = {
      id,
      createdAt: date,
      ...item,
    };

    data.push(message);
    await this.save();
    return message;
  },
  async save() {
    return fs.writeFile(filename, JSON.stringify(data, null, 2));
  },
};

export default fileDb;
