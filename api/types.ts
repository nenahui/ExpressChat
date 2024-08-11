export interface IMessage {
  id: string;
  author: string;
  message: string;
  createdAt: string;
}

export type TMessageMutation = Omit<IMessage, 'createdAt' | 'id'>;
