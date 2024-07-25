import { Schema } from 'express-validator';

export const newMessage: Schema = {
  text: {
    in: 'body',
    trim: true,
    escape: true,
    isLength: {
      options: {
        min: 1,
        max: 1000
      }
    }
  }
}
