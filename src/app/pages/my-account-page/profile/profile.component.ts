import { Component, OnInit } from '@angular/core';
import { IProfile } from 'src/app/core/models/profile/profile.model';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile!: IProfile;
  ngOnInit(): void {
    this.profile = this.profileSrv.getProfileInSession();
  }

  constructor(
    private profileSrv: ProfileService
  ) { }
}
