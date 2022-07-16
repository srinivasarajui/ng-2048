import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import * as Hammer from 'hammerjs';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GameStateService } from './game-state.service';

export class MyHammerConfig extends HammerGestureConfig {
  override overrides = <any> {
    swipe: { direction: Hammer.DIRECTION_ALL },
  };
}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,HammerModule
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig,
    },
    GameStateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
