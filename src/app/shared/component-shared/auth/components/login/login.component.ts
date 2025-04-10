import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { IToken } from 'src/app/core/models/common/response-data.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ChatbotService } from 'src/app/core/services/chatbot.service';
import { getProfile } from 'src/app/core/store/profile/profile.actions';


const plugins = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule
];

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: plugins
})
export class LoginComponent implements OnInit {
  #modal = inject(NzModalRef);
  loginForm!: FormGroup;
  isLoading = false;
  submitted = false;
  formError = "";
  @Output() switchToRegister = new EventEmitter<void>();
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastrSrv: ToastrService,
    private store: Store,
    private chatbotSrv: ChatbotService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"),
        ],
      ],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  get f(): { [key: string]: AbstractControl; } {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.formError = "";

    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.processLogin(this.authService.doLogin(this.loginForm.value));
  }

  handleGoogleLogin(): void {
    this.processLogin(this.authService.loginWithGoogle());
  }

  private processLogin(authObservable: Observable<IToken>): void {
    authObservable.subscribe({
      next: (auth) => {
        if (auth.accessToken) {
          this.authService.setToken(auth);
          this.authService.changeLoginStatus(true);
          this.store.dispatch(getProfile());
          this.authService.promptLogin(false);
          this.toastrSrv.success('Login successfully', 'Success', { timeOut: 3000 });
          this.#modal.close();
        }
        this.isLoading = false;
      },
      error: () => {
        this.formError = "Incorrect email or password. Please try again.";
        this.isLoading = false;
      }
    });
  }

  onInputChange(): void {
    if (this.formError && this.submitted) {
      this.formError = "";
    }
  }
}
