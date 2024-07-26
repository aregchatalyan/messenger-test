import { $api } from '../utils/fetcher';

export const fetchMessages = async () => {
  try {
    const messages = await $api.get('/messages');
    return messages.data;
  } catch (e) {
    throw e;
  }
}

export const createMessage = async (text: string) => {
  try {
    const message = await $api.post('/messages', { text });
    return message.data;
  } catch (e) {
    throw e;
  }
}
