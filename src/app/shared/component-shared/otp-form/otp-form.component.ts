import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

const plugins = [
  CommonModule
];
@Component({
  selector: 'app-otp-form',
  templateUrl: './otp-form.component.html',
  styleUrls: ['./otp-form.component.scss'],
  standalone: true,
  imports: plugins
})
export class OtpFormComponent {
  moveToNext(nextElement: HTMLInputElement, event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.value.length === input.maxLength) {
      nextElement?.focus();
    }
  }

  moveToPrevious(previousElement: HTMLInputElement | null, event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    if (event.key === 'Backspace' && input.value.length === 0 && previousElement) {
      previousElement.focus();
    }
  }
}
