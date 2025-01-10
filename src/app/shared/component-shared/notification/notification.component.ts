import { CommonModule } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification';
import { NotificationType } from 'src/app/core/models/common/enums/index.enum';
import { Notification } from 'src/app/core/models/common/notification.mode';

const plugins = [
  CommonModule,
  NzNotificationModule
];
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  standalone: true,
  imports: plugins
})
export class NotificationComponent {
  @ViewChild('notificationTemplate', { static: true }) notificationTemplate!: TemplateRef<{}>;
  notification = new Notification(NotificationType.SUCCESS, '', '', '', '', '', '');


  public createNotification(notification: Notification): void {
    this.notification = notification;
    this.notificationSrv.template(
      this.notificationTemplate, {
      nzDuration: 3000,
      nzClass: 'notification-wrapper'
    });
  }

  constructor(
    private notificationSrv: NzNotificationService
  ) { }
}
