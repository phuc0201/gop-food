import { CommonModule } from '@angular/common';
import { HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { ToastrService } from 'ngx-toastr';
import { ILoginDTO, SignupDTO } from 'src/app/core/models/auth/auth.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { getProfile } from 'src/app/core/store/profile/profile.actions';
const plugins = [
  CommonModule,
  NzModalModule,
  NzButtonModule,
  NzRadioModule,
  FormsModule,
  ReactiveFormsModule
];
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  standalone: true,
  imports: plugins
})
export class AuthComponent implements OnInit {
  @Input() openAuthForm: boolean = false;
  @Output() openAuthFormChange = new EventEmitter<boolean>();
  passwordVisible: boolean = false;
  isLoginForm: boolean = true;
  isSignupFormSubmited: boolean = false;
  loginFormData: ILoginDTO = {
    email: '',
    password: ''
  };

  signUpForm: FormGroup = new FormGroup({
    full_name: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    gender: new FormControl(true),
  });;

  showModal(): void {
    this.openAuthForm = true;
  }

  handleLogin(): void {
    this.authSrv.doLogin(this.loginFormData).subscribe({
      next: (auth) => {
        if (auth.accessToken != '') {
          this.authSrv.setToken(auth);
          this.authSrv.changeLoginStatus(true);
          this.store.dispatch(getProfile());
          this.authSrv.promptLogin(false);
          this.openAuthForm = false;
          this.openAuthFormChange.emit(this.openAuthForm);
          this.toastrSrv.success('Login successfully', 'Success', {
            timeOut: 3000,
          });
        }
      },
      error: () => {
        this.toastrSrv.error('Login failed', 'Error', {
          timeOut: 3000,
        });
      }
    });
  }

  handleSigup(): void {
    this.isSignupFormSubmited = true;
    if (this.signUpForm.valid) {
      const formData = new SignupDTO();
      formData.full_name = this.signUpForm.get('full_name')?.value;
      formData.email = this.signUpForm.get('email')?.value;
      formData.password = this.signUpForm.get('password')?.value;
      formData.phone = this.signUpForm.get('phone')?.value;
      formData.address = this.signUpForm.get('address')?.value;
      formData.gender = this.signUpForm.get('gender')?.value;

      this.authSrv.doSignup(formData).subscribe(
        (res: HttpResponse<any>) => {
          if (res.status == HttpStatusCode.Created) {
            this.toastrSrv.success('Signup successfully', 'Success', {
              timeOut: 3000,
            });

            this.isLoginForm = true;
          }
          else {
            this.toastrSrv.error('Signup failed', 'Error', {
              timeOut: 3000,
            });
          }
        }
      );
    } else {
      this.toastrSrv.warning('Please re-enter the required information to proceed', 'Failed', {
        timeOut: 3000,
      });
    }
  }

  handleCancel(): void {
    this.authSrv.promptLogin(false);
    this.openAuthForm = false;
    this.isLoginForm = true;
    this.openAuthFormChange.emit(this.openAuthForm);
  }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,20}$')]],
      full_name: ['', Validators.required],
      address: ['', Validators.required],
      gender: [true, Validators.required]
    });
  }

  constructor(
    private store: Store,
    private authSrv: AuthService,
    private fb: FormBuilder,
    private toastrSrv: ToastrService
  ) { }
}
