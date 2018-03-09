import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MomentModule } from 'angular2-moment';

import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';
import { CalendarComponent } from './calendar/calendar.component';
import { TimeComponent } from './time/time.component';


@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    CalendarComponent,
    TimeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MomentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
