export class Restaurant {
  _id: string = '';
  avatar: string = '';
  restaurant_name: string = '';
  status: string = '';
}

export class ChatbotResponse {
  sender: 'bot' | 'user' = 'bot';
  message: string = '';
  restaurants?: Restaurant[] = [];
}
