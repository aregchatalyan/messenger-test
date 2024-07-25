import { Router } from 'express';
import { MessageController } from './message.contoller';
import { newMessage } from './message.validator';
import { validate } from '../../middlewares/validation.middleware';

export const router = Router();

router.post('/',
  validate(newMessage),
  MessageController.createMessage
);

router.get('/',
  MessageController.getAllMessages
);
