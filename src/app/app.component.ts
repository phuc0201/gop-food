import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { initFlowbite } from 'flowbite';
import { filter, switchMap, take } from 'rxjs';
import { AuthService } from './core/services/auth.service';
import { GeolocationService } from './core/services/geolocation.service';
import { ProfileService } from './core/services/profile.service';
import { selectToken } from './core/store/auth/auth.selectors';
import { getProfile } from './core/store/profile/profile.actions';
import { selectProfile } from './core/store/profile/profile.selectors';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  loadProfile() {
    if (!this.authSrv.isLogged()) {
      this.store.select(selectToken).pipe(
        filter(token => token.accessToken !== ''),
        take(1),
        switchMap(() => {
          this.store.dispatch(getProfile());
          return this.store.select(selectProfile).pipe(
            filter(data => data.error === '' && data.profile._id !== ''),
            take(1)
          );
        })
      ).subscribe(data => {
        this.profileSrv.setCustomerProfile(data.profile);
      });
    } else if (this.profileSrv.getCustomerProfile() === null) {
      this.store.dispatch(getProfile());
      this.store.select(selectProfile).pipe(
        filter(data => data.error === '' && data.profile._id !== ''),
        take(1)
      ).subscribe(data => {
        this.profileSrv.setCustomerProfile(data.profile);
      });
    }
  }


  ngOnInit() {
    initFlowbite();
    this.loadProfile();
    this.geolocation.setLocation();
  }


  constructor(
    private store: Store,
    private authSrv: AuthService,
    private profileSrv: ProfileService,
    private geolocation: GeolocationService,
  ) {
    if (!localStorage.getItem('language')) {
      localStorage.setItem('language', 'vi');
    }
  }
}
