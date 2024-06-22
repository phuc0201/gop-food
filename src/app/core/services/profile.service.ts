import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, filter } from "rxjs";
import { SystemConstant } from "../constants/system.constant";
import { URLConstant } from "../constants/url.constant";
import { IProfile } from "../models/profile/profile.model";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseURL: string = URLConstant.API.ENDPOINT;
  addressDefault: string = '01 Võ Văn Ngân, P.Linh Chiểu, Tp.Thủ Đức, Hồ Chí Minh';
  private address;
  currentAddress: Observable<string>;

  constructor(
    private http: HttpClient
  ) {
    this.address = new BehaviorSubject<string>(this.addressDefault);
    this.currentAddress = this.address.asObservable();
  }

  setAddressSelected (address: string) {
    this.address.next(address);
  }

  setProfileIntoSession(profile: IProfile) {
    sessionStorage.setItem(SystemConstant.CURRENT_PROFILE, JSON.stringify(profile));
    this.setAddressSelected(profile.address)
  }

  getProfileInSession(): IProfile {
    let profile = sessionStorage.getItem(SystemConstant.CURRENT_PROFILE);
    let crrProfile: IProfile = {
      _id: '',
      full_name: '',
      email: '',
      gender: false,
      address: '',
      avatar: ''
    };

    if(profile ==  null){
      this.getProfile()
      .pipe(
        filter(res => res._id !=='')
      )
      .subscribe(data => {
        crrProfile = data;
        this.setProfileIntoSession(data);
      })
    }
    return profile ? JSON.parse(profile) :
     (crrProfile ? crrProfile : null);
  }

  getProfile(): Observable<IProfile> {
    return this.http.get<IProfile>(this.baseURL + URLConstant.API.PROFILE.GET);
  }
}
