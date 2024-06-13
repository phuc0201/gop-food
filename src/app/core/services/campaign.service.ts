import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { URLConstant } from "../constants/url.constant";
import { Campaign } from "../models/campaign/campain.model";

@Injectable({
  providedIn: "root"
})
export class CampaignService {
  private baseUrl = URLConstant.API.ENDPOINT;
  constructor(
    private http: HttpClient
  ){}

  fetchAllCampaign(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(this.baseUrl + URLConstant.API.CAMPAIGN.GET_ALL);
  }
}
