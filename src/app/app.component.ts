import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { initFlowbite } from 'flowbite';
import { NotificationColor } from './core/mock-data/notification-color.data';
import { Notification } from './core/models/common/notification.mode';
import { AuthService } from './core/services/auth.service';
import { GeolocationService } from './core/services/geolocation.service';
import { ProfileService } from './core/services/profile.service';
import { getProfile } from './core/store/profile/profile.actions';
import { NotificationType } from './core/utils/enums/index.enum';
import { NotificationComponent } from './shared/component-shared/notification/notification.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild(NotificationComponent) notification!: NotificationComponent;

  // loadProfile() {
  //   if (!this.authSrv.isLogged()) {
  //     this.store.select(selectToken).pipe(
  //       filter(token => token.accessToken !== ''),
  //       take(1),
  //       switchMap(() => {
  //         this.store.dispatch(getProfile());
  //         return this.store.select(selectProfile).pipe(
  //           filter(data => data.error === '' && data.profile._id !== ''),
  //           take(1)
  //         );
  //       })
  //     ).subscribe(data => {
  //       this.profileSrv.setProfileIntoSession(data.profile);
  //     });
  //   } else if (this.profileSrv.getProfileInSession() === null) {
  //     this.store.dispatch(getProfile());
  //     this.store.select(selectProfile).pipe(
  //       filter(data => data.error === '' && data.profile._id !== ''),
  //       take(1)
  //     ).subscribe(data => {
  //       this.profileSrv.setProfileIntoSession(data.profile);
  //     });
  //   }
  // }

  connectSocket() {
    const index = NotificationColor.findIndex(notify => notify.type === NotificationType.SUCCESS);
    const notificationColor = NotificationColor[index];
    const notification = new Notification(
      NotificationType.SUCCESS,
      'Thành công',
      'Nhà hàng đã nhận đơn',
      '',
      notificationColor.titleColor,
      notificationColor.contentColor,
      notificationColor.iconColor,
    );
    this.notification.createNotification(notification);
  }

  async ngOnInit() {
    initFlowbite();
    if (this.authSrv.isLogged()) {
      this.store.dispatch(getProfile());
    }
  }

  ngAfterViewInit(): void {
    // this.connectSocket();
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
    this.geolocation.loadLocation();
  }
}
