import { CommonModule } from '@angular/common';
import { HttpStatusCode } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { SignupDTO } from 'src/app/core/models/auth/auth.model';
import { AuthService } from 'src/app/core/services/auth.service';
const plugins = [
  CommonModule,
  ReactiveFormsModule,
  FormsModule
];

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: plugins
})
export class RegisterComponent {
  @Output() switchToLogin = new EventEmitter<void>();
  registerForm!: FormGroup;
  isLoading = false;
  submitted = false;
  formError = "";
  formSuccess = "";

  // Custom validator patterns
  phonePattern = "^(0|\\+84)(3|5|7|8|9)[0-9]{8}$";
  namePattern = "^[a-zA-ZÀ-ỹ\\s]{2,}$";
  passwordPattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$";

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.registerForm = this.fb.group(
      {
        fullname: ["", [Validators.required, Validators.minLength(2), Validators.pattern(this.namePattern)]],
        phone: ["", [Validators.required, Validators.pattern(this.phonePattern)]],
        email: [
          "",
          [
            Validators.required,
            Validators.email,
            Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"),
          ],
        ],
        password: ["", [Validators.required, Validators.minLength(8), Validators.pattern(this.passwordPattern)]],
        confirmPassword: ["", [Validators.required]],
        address: ["", [Validators.required, Validators.minLength(5)]],
        gender: ["male", Validators.required],
        terms: [false, Validators.requiredTrue],
      },
      {
        validators: [this.passwordMatchValidator],
      },
    );
  }

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get("password");
    const confirmPassword = control.get("confirmPassword");

    if (!password || !confirmPassword) {
      return null;
    }

    return password.value === confirmPassword.value ? null : { passwordMismatch: true };
  };

  get f(): { [key: string]: AbstractControl; } {
    return this.registerForm.controls;
  }

  async onSubmit(): Promise<void> {
    this.submitted = true;
    this.formError = "";
    this.formSuccess = "";

    if (this.registerForm.invalid) {
      const firstError = document.querySelector(".text-red-500");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }
    else {
      this.isLoading = true;
      const { email, password, fullname, phone, address, gender } = this.registerForm.value;

      const dto: SignupDTO = {
        email: email,
        phone: phone,
        password: password,
        full_name: fullname,
        address: address,
        gender: gender === 'male'
      };

      this.authService.doSignup(dto).subscribe({
        next: (response) => {
          if (response.status == HttpStatusCode.Created) {
            this.formSuccess = "Registration successful! You will be redirected to the login page...";
            this.isLoading = false;
            this.switchToLogin.emit();
          }
          else {
            this.isLoading = false;
            this.formError = 'An error occurred during registration. Please try again.';
          }
        }
      });
    }
  }

  onInputChange(): void {
    if ((this.formError || this.formSuccess) && this.submitted) {
      this.formError = "";
      this.formSuccess = "";
    }
  }

  getPasswordStrength(): number {
    const password = this.f["password"].value || "";
    let strength = 0;

    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    return strength;
  }

  getPasswordStrengthText(): string {
    const strength = this.getPasswordStrength();
    if (strength <= 2) return "Yếu";
    if (strength <= 3) return "Trung bình";
    if (strength <= 4) return "Mạnh";
    return "Rất mạnh";
  }

  getPasswordStrengthClass(): string {
    const strength = this.getPasswordStrength();
    if (strength <= 2) return "bg-red-500";
    if (strength <= 3) return "bg-yellow-500";
    if (strength <= 4) return "bg-blue-500";
    return "bg-green-500";
  }
}
