import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ScrollDirective } from '../shared/widget/directives/scroll.directive';
import { AuthEffects } from './store/auth/auth.effects';
import { loginReducer } from './store/auth/auth.reducer';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ScrollDirective,
    StoreModule.forRoot({ auth_login: loginReducer }),
    EffectsModule.forRoot([AuthEffects])
  ]
})
export class CoreModule { }
