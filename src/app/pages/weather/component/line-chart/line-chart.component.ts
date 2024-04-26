import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, input } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'wa-line-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss',
})
export class LineChartComponent implements OnChanges {
  @Input({ required: true }) temperatures!: number[];
  @Input({ required: true }) labels!: string[];
  @Input({ required: true }) identifier!: string;
  chart: any = [];

  ngOnChanges(): void {
    if (this.temperatures && this.labels) {
      this.createChart();
    }
  }

  createChart() {
    this.chart = new Chart('temperatureChart', {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: `Temperature forecast for ${this.identifier}`,
            data: this.temperatures,
            backgroundColor: 'blue',
          },
        ],
      },
    });
  }
}
