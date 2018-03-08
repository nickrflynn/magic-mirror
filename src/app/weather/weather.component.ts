import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'mirror-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  private key: string;

  public temperatureData: ITemperatureData;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('./../assets/mirror-config.json').subscribe((data) => {
      this.key = data['openWeatherMapApiKey'];
      this.getCurrentWeather();
    });
  }

  public getCurrentWeather(): void {
    const apiResponse =
      this.http.get(`http://api.openweathermap.org/data/2.5/weather?q=Provo&units=imperial&&APPID=${this.key}`);
      apiResponse.subscribe((weather: IWeatherData) => {
        this.temperatureData = weather.main;
    });
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
}


