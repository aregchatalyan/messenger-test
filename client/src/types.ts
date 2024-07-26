export interface IMessage {
  id: number;
  text: string;
}

export enum EventTypes {
  NEW_MESSAGE = 'new_message',
  DELETE_MESSAGE = 'delete_message',
}
