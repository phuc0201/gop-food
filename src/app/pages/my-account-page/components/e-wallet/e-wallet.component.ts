import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, tap } from 'rxjs';
import { IProfile } from 'src/app/core/models/profile/profile.model';
import { PaymentService } from 'src/app/core/services/payment.service';
import { ProfileService } from 'src/app/core/services/profile.service';


@Component({
  selector: 'app-e-wallet',
  templateUrl: './e-wallet.component.html',
  styleUrls: ['./e-wallet.component.scss'],
})
export class EWalletComponent implements OnInit {
  balance: number = 2000000000;
  profile!: IProfile;
  amount: number = 0;
  paymentSuccessful: boolean = false;
  paymentFailure: boolean = false;


  removeAccents(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
  }

  deposit() {
    this.paymentSrv.deposit(100000)
      .pipe(
        filter(res => res !== '' && res !== undefined),
        tap(res => console.log('Response received:', res)) // Log phản hồi
      )
      .subscribe({
        next: res => {
          try {
            const url = new URL(res);
            window.location.href = url.href;
          } catch (e) {
            console.log('Invalid URL:', res);
          }
        },
        error: err => {
          console.log('Error occurred:', err);
        }
      });
  }


  ngOnInit(): void {
    this.profile = this.profileSrv.getProfileInSession();
    this.route.queryParams.subscribe(params => {
      if (params['vnp_Amount']) {
        this.amount = Math.ceil(Number(params['vnp_Amount']) / 100);
        if (params['vnp_ResponseCode'] == '00') {
          this.paymentSuccessful = true;
          setTimeout(() => {
            this.paymentSuccessful = false;
          }, 1500);
        }
        else {
          this.paymentFailure = true;
          setTimeout(() => {
            this.paymentFailure = false;
          }, 1500);
        }
      }
    });
  }

  constructor(
    private profileSrv: ProfileService,
    private paymentSrv: PaymentService,
    private route: ActivatedRoute,
  ) { }
}
