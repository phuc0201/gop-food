import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ScrollDirective } from '../shared/widget/directives/scroll.directive';
import { AuthEffects } from './store/auth/auth.effects';
import { loginReducer } from './store/auth/auth.reducers';
import { CampaignEffects } from './store/campaign/campaign.effects';
import { getAllCampaignReducer } from './store/campaign/campaign.reducers';
import { CuisineEffects } from './store/cuisine/cuisine.effects';
import { cuisinesReducer } from './store/cuisine/cuisine.reducers';
import { GeolocationEffects } from './store/geolocation/geolocation.effects';
import { searchAddressReducer } from './store/geolocation/geolocation.reducers';
import { OrderEffects } from './store/order/order.effects';
import { orderHistoryReducer } from './store/order/order.reducers';
import { ProfileEffects } from './store/profile/profile.effects';
import { getProfileReducer } from './store/profile/profile.reducers';
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
      foodDetail: foodDetailReducer,
      search_address: searchAddressReducer,
      get_campaigns: getAllCampaignReducer,
      cuisines: cuisinesReducer,
      orderHistory: orderHistoryReducer
    }),
    EffectsModule.forRoot([
      AuthEffects,
      ProfileEffects,
      RestaurantEffects,
      GeolocationEffects,
      CampaignEffects,
      CuisineEffects,
      OrderEffects
    ])
  ]
})
export class CoreModule { }
