import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, switchMap } from "rxjs";
import { environment } from "src/environments/environment";
import { ChatbotResponse } from "../models/chatbot/chatbot-response.model";
import { SelectedAddress } from "../models/geolocation/location.model";
import { GeolocationService } from "./geolocation.service";

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private baseURL = environment.api.baseUrl;
  constructor(
    private geoSrv: GeolocationService,
    private http: HttpClient
  ) { }

  startBot() {
    return this.geoSrv.currLocation.pipe(
      switchMap((location: SelectedAddress) => {
        let params = new HttpParams()
          .set('coords', `${location.coordinates[1]},${location.coordinates[0]}`);

        return this.http.get(this.baseURL + '/chatbot/create-chat', { params });
      })
    );
  }

  sendMessage(message: string): Observable<ChatbotResponse> {
    return this.geoSrv.currLocation.pipe(
      switchMap((location: SelectedAddress) => {
        const dto = {
          message: message,
          coords: [location.coordinates[1], location.coordinates[0]],
        };

        return this.http.post<ChatbotResponse>(this.baseURL + '/chatbot/ask', dto);
      })
    );
  }
}
