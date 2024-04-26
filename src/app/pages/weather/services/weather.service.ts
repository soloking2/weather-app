import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IWeather, Period } from '../models/weather.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  endpoint = `https://api.weather.gov/gridpoints`;
  constructor(private http: HttpClient) {}

  getWeatherForecast(identifier: string): Observable<Period[]> {
    return this.http
      .get<IWeather>(`${this.endpoint}/${identifier}/31,80/forecast`)
      .pipe(map((response) => response.properties.periods));
  }
}
