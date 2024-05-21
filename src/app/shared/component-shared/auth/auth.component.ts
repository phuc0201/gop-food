import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { skip, take } from 'rxjs';
import { ILoginDTO } from 'src/app/core/models/auth/auth.model';
import { loginRequest } from 'src/app/core/store/auth/auth.actions';
import { selectToken } from 'src/app/core/store/auth/auth.selectors';
const plugins = [
  CommonModule,
  NzModalModule,
  NzButtonModule,
  NzRadioModule,
  FormsModule
];
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  standalone: true,
  imports: plugins
})
export class AuthComponent {
  @Input() openAuthForm: boolean = false;
  @Output() openAuthFormChange = new EventEmitter<boolean>();
  passwordVisible: boolean = false;
  isLoginForm: boolean = true;
  isMale: boolean = true;
  loginFormData: ILoginDTO = {
    email: '',
    password: ''
  };
  showModal(): void {
    this.openAuthForm = true;
  }

  handleLogin(): void {
    this.store.dispatch(loginRequest({ accCred: this.loginFormData }));
    this.store.select(selectToken).pipe(
      skip(1),
      take(1)).subscribe((auth) => {
        if (auth.accessToken != '') {
          this.openAuthForm = false;
          this.openAuthFormChange.emit(this.openAuthForm);
        }
        else {
          alert('Login failed');
        }
      });
  }

  handleSigup(): void {
    this.openAuthForm = false;
    this.openAuthFormChange.emit(this.openAuthForm);
  }

  handleCancel(): void {
    this.openAuthForm = false;
    this.isLoginForm = true;
    this.openAuthFormChange.emit(this.openAuthForm);
  }


  constructor(
    private modal: NzModalService,
    private store: Store
  ) { }
}
