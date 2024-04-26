import { Routes } from '@angular/router';

export const WEATHER_ROUTES_DEFINITION = {
  WEATHER: `weather`,
  WEATHER_DETAILS: (identifier: string) => `weather/${identifier}`
}

export const routes: Routes = [
  {
    path: 'weather',
    loadComponent: () =>
      import('./pages/weather/weather.component').then(
        (c) => c.WeatherComponent
      ),
  },
  {
    path: 'weather/:identifier',
    loadComponent: () =>
      import('./pages/weather/weather-details/weather-details.component').then(
        (c) => c.WeatherDetailsComponent
      ),
  },
  {
    path: '',
    redirectTo: 'weather',
    pathMatch: 'full',
  },
];
