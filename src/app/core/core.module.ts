import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ScrollDirective } from '../shared/widget/directives/scroll.directive';
import { AuthEffects } from './store/auth/auth.effects';
import { loginReducer } from './store/auth/auth.reducer';
import { CampaignEffects } from './store/campaign/campaign.effects';
import { getAllCampaignReducer } from './store/campaign/campaign.reducer';
import { GeolocationEffects } from './store/geolocation/geolocation.effects';
import { searchAddressReducer } from './store/geolocation/geolocation.reducer';
import { ProfileEffects } from './store/profile/profile.effects';
import { getProfileReducer } from './store/profile/profile.reducer';
import { RestaurantEffects } from './store/restaurant/restaurant.effects';
import { getFoodDetailsReducer, getMenuReducer, getRestaurantInfoReducer, getRestaurantListReducer } from './store/restaurant/restaurant.reducer';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ScrollDirective,
    StoreModule.forRoot({
      auth_login: loginReducer,
      get_profile: getProfileReducer,
      get_restaurant_list: getRestaurantListReducer, get_restaurant_info: getRestaurantInfoReducer,
      get_menu: getMenuReducer,
      getFoodDetails: getFoodDetailsReducer,
      search_address: searchAddressReducer,
      get_campaigns: getAllCampaignReducer }),
    EffectsModule.forRoot([
      AuthEffects,
      ProfileEffects,
      RestaurantEffects,
      GeolocationEffects,
      CampaignEffects
    ])
  ]
})
export class CoreModule { }
