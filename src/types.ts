export interface IMessage {
  id: number;
  text: string;
}

export interface IAction {
  type: string;
  message: IMessage;
}
