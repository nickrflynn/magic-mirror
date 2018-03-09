import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'mirror-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  private apiKey: string;

  public temperatureData: ITemperatureData;
  public weatherIconClass: string;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('./../assets/mirror-config.json').subscribe((data) => {
      this.apiKey = data['openWeatherMapApiKey'];
      this.getCurrentWeather();
    });
  }

  public getCurrentWeather(): void {
    const apiResponse =
      this.http.get(`http://api.openweathermap.org/data/2.5/weather?q=Provo&units=imperial&&APPID=${this.apiKey}`);
      apiResponse.subscribe((weather: IWeatherData) => {
        this.temperatureData = weather.main;
        this.setIconClass(weather.weather[0].id);
    });
  }

  private setIconClass(id: string): void {
    this.weatherIconClass = 'wi-day-sunny';
  }
}

// OpenWeatherMap API models
class ITemperatureData {
  temp: number;
  pressure: number;
  humidity: number;
  temp_min: number;
  temp_max: number;
}

class IWeatherData {
  main: ITemperatureData;
  weather: any;
}


