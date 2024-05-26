import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { SystemConstant } from "../constants/system.constant";
import { URLConstant } from "../constants/url.constant";
import { IProfile } from "../models/profile/profile.model";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseURL: string = URLConstant.API.ENDPOINT;
  profile: IProfile = {
    _id: '',
    email: '',
    full_name: '',
    gender: true,
    avatar: '',
    address: '01 Võ Văn Ngân, P.Linh Chiểu, Tp.Thủ Đức, Hồ Chí Minh'
  };
  private customerProfile;
  currentProfile: Observable<IProfile>;

  constructor(
    private http: HttpClient
  ) {
    this.profile = this.getCustomerProfile() !== null ? this.getCustomerProfile() : this.profile;

    this.customerProfile = new BehaviorSubject<IProfile>(this.profile);

    this.currentProfile = this.customerProfile.asObservable();
  }

  setCustomerProfile(profile: IProfile) {
    sessionStorage.setItem(SystemConstant.CURRENT_PROFILE, JSON.stringify(profile));
    this.customerProfile.next(profile);
  }

  getCustomerProfile(): IProfile {
    const profile = sessionStorage.getItem(SystemConstant.CURRENT_PROFILE);
    return profile ? JSON.parse(profile) : null;
  }

  getProfile(): Observable<IProfile> {
    return this.http.get<IProfile>(this.baseURL + URLConstant.API.PROFILE.GET);
  }
}
