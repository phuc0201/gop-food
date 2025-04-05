export class FoodItem {
  id: string = '';
  name: string = '';
  price: string = '';
  image: string = '';
}

export class Restaurant {
  restaurant_id: string = '';
  restaurant_avatar: string = '';
  restaurant_name: string = '';
  foodItems: FoodItem[] = [];
}

export class ChatbotResponse {
  sender: 'bot' | 'user' = 'bot';
  message: string = '';
  restaurants?: Restaurant[] = [];
}
