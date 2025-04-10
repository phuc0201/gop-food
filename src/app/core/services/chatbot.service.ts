import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ChatbotResponse } from "../models/chatbot/chatbot-response.model";

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private baseURL = environment.api.baseUrl;
  private chatHistory = new BehaviorSubject<ChatbotResponse[]>([]);

  constructor(
    private http: HttpClient
  ) { }

  getChatHistory(): Observable<ChatbotResponse[]> {
    return this.chatHistory.asObservable();
  }

  addMessageToHistory(message: ChatbotResponse): void {
    const currentHistory = this.chatHistory.value;
    this.chatHistory.next([...currentHistory, message]);
  }

  sendMessage(message: string): Observable<ChatbotResponse> {
    return this.http.post<ChatbotResponse>(this.baseURL + '/chatbot/ask', { message });
  }
}
