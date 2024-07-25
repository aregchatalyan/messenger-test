import { NextFunction, Request, Response } from 'express';
import { MessageService } from './message.service';

export class MessageController {
  static async getAllMessages(_req: Request, res: Response, next: NextFunction) {
    try {
      const messages = MessageService.getAllMessages();

      res.status(200).json(messages);
    } catch (e) {
      next(e);
    }
  }

  static async createMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const { text } = req.body;

      const message = MessageService.createMessage(text);

      res.status(201).json(message);
    } catch (e) {
      next(e);
    }
  }
}
