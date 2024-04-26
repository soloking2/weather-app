import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { WEATHER_ROUTES_DEFINITION } from '../../app.routes';
import { IWeatherOption } from './models/weather.model';

@Component({
  selector: 'wa-weather',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
})
export class WeatherComponent {
  WEATHER_ROUTES = WEATHER_ROUTES_DEFINITION;
  title = 'Weather App ';
  weatherOptions: IWeatherOption[] = [
    {
      key: 'LWX',
      location: 'District of Columbia Forecast',
    },
    {
      key: 'TOP',
      location: 'Kansas Forecast',
    },
  ];

  constructor(private router: Router) {}

  navigateToWeatherDetails(option: IWeatherOption) {
    this.router.navigate([this.WEATHER_ROUTES.WEATHER_DETAILS(option.key)]);
  }
}
