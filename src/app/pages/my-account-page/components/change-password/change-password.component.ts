import { Component, OnInit, Type, ViewContainerRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { IProfile } from 'src/app/core/models/profile/profile.model';
import { ProfileService } from 'src/app/core/services/profile.service';
import { OtpFormComponent } from 'src/app/shared/component-shared/otp-form/otp-form.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  profile!: IProfile;

  createModal<T>(component: Type<T>, className: string, data: any[] = []) {
    return this.modal.create<T, any>({
      nzContent: component,
      nzClosable: false,
      nzWrapClassName: className,
      nzViewContainerRef: this.viewContainerRef,
      nzFooter: null,
      nzData: data
    });
  }

  sendOTP() {
    this.createModal(OtpFormComponent, 'otp-modal');
  }

  ngOnInit(): void {
    this.profile = this.profileSrv.getProfileInSession();
  }

  constructor(
    private profileSrv: ProfileService,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
  ) { }
}
