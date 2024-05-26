import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';

const routers: Routes = [
  {
    path: '',
    component: ProfileComponent,
    title: 'Profile'
  }
];

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ProfilePageModule { }
