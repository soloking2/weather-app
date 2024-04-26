import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { WeatherService } from '../services/weather.service';
import { CommonModule } from '@angular/common';
import { LineChartComponent } from '../component/line-chart/line-chart.component';
import { WeatherEnum } from '../data/weather-data';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Period } from '../models/weather.model';

@Component({
  selector: 'wa-weather-details',
  standalone: true,
  imports: [CommonModule, LineChartComponent],
  templateUrl: './weather-details.component.html',
  styleUrl: './weather-details.component.scss',
})
export class WeatherDetailsComponent implements OnInit {
  temperatures!: number[];
  labels!: string[];
  identifier!: string;
  isLoading: boolean = false;
  private destroy$ = inject(DestroyRef);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      if (param.has(WeatherEnum.IDENTIFIER)) {
        this.identifier = param.get(WeatherEnum.IDENTIFIER) as string;
        this.getWeatherForecast(this.identifier);
      }
    });
  }

  getWeatherForecast(identifier: string) {
    this.weatherService
      .getWeatherForecast(identifier)
      .pipe(takeUntilDestroyed(this.destroy$))
      .subscribe((res) => {
        this.temperatures = this.getTemperatures(res);
        this.labels = this.getTemperatureLabels(res);
      });
  }

  getTemperatures(periods: Period[]) {
    return periods.map((period) => period.temperature);
  }

  getTemperatureLabels(periods: Period[]) {
    return periods.map((period) => period.name);
  }

  showLoading() {
    this.router.events
    .subscribe(
      {
        next: (event) => {
          if(event instanceof NavigationStart || RouteConfigLoadStart) {
            this.isLoading = true;
          } else if(event instanceof NavigationEnd || event instanceof NavigationError || event instanceof NavigationCancel || event instanceof RouteConfigLoadEnd) {
            this.isLoading = false;
          }
        }
      }
    )
  }

  navigateBack() {
    this.router.navigate(['/'])
  }
}
