import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ScrollDirective } from '../shared/widget/directives/scroll.directive';
import { AuthEffects } from './store/auth/auth.effects';
import { loginReducer } from './store/auth/auth.reducer';
import { CampaignEffects } from './store/campaign/campaign.effect';
import { getAllCampaignReducer } from './store/campaign/campaign.reducer';
import { CuisineEffects } from './store/cuisine/cuisine.effect';
import { cuisinesReducer } from './store/cuisine/cuisine.reducer';
import { GeolocationEffects } from './store/geolocation/geolocation.effect';
import { searchAddressReducer } from './store/geolocation/geolocation.reducer';
import { ProfileEffects } from './store/profile/profile.effect';
import { getProfileReducer } from './store/profile/profile.reducer';
import { RestaurantEffects } from './store/restaurant/restaurant.effects';
import { foodDetailReducer, menuReducer, restaurantDetailReducer, restaurantsReducer } from './store/restaurant/restaurant.reducers';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ScrollDirective,
    StoreModule.forRoot({
      auth_login: loginReducer,
      get_profile: getProfileReducer,
      restaurants: restaurantsReducer,
      restaurantDetail: restaurantDetailReducer,
      menu: menuReducer,
      foodDetails: foodDetailReducer,
      search_address: searchAddressReducer,
      get_campaigns: getAllCampaignReducer,
      cuisines: cuisinesReducer,
    }),
    EffectsModule.forRoot([
      AuthEffects,
      ProfileEffects,
      RestaurantEffects,
      GeolocationEffects,
      CampaignEffects,
      CuisineEffects
    ])
  ]
})
export class CoreModule { }
