import { Component, OnInit } from '@angular/core';
import { GeolocationService } from 'src/app/core/services/geolocation.service';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  address: string = '';

  loadProfile(): void {
    this.geoSrv.currLocation.subscribe(res => this.address = res.address)
  }

  ngOnInit(): void {
    this.loadProfile();
  }

  constructor(
    private geoSrv: GeolocationService,
    private profileSrv: ProfileService
  ) { }
}

