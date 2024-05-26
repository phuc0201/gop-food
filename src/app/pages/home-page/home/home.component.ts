import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IProfile } from 'src/app/core/models/profile/profile.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  customers!: IProfile;
  initData() {
    this.customers = {
      _id: '',
      email: '',
      full_name: '',
      gender: true,
      avatar: '',
      address: ''
    };
  }

  loadCustomerProfile(): void {
    this.profileSrv.currentProfile.subscribe(profile => this.customers = profile);
  }

  ngOnInit(): void {
    this.initData();
    this.loadCustomerProfile();
  }

  constructor(
    private store: Store,
    private authSrv: AuthService,
    private profileSrv: ProfileService
  ) { }
}

