import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { initFlowbite } from 'flowbite';
import { AuthService } from './core/services/auth.service';
import { GeolocationService } from './core/services/geolocation.service';
import { getProfile } from './core/store/profile/profile.actions';
import { NotificationComponent } from './shared/component-shared/notification/notification.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild(NotificationComponent) notification!: NotificationComponent;

  constructor(
    private store: Store,
    private authSrv: AuthService,
    private geolocation: GeolocationService,
  ) {
    if (!localStorage.getItem('language')) {
      localStorage.setItem('language', 'en');
    }
    this.geolocation.loadLocation();
  }

  ngOnInit() {
    initFlowbite();
    if (this.authSrv.isLogged()) {
      this.store.dispatch(getProfile());
    }

    this.geolocation.loadLocation();
  }
}
