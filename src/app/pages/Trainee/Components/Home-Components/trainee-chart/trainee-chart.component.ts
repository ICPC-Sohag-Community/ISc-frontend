import { Component, inject, OnInit, AfterViewInit } from '@angular/core';
import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
  Plugin,
  registerables,
} from 'chart.js';
import { CommonModule, DatePipe } from '@angular/common';
import { HomeService } from '../../../Services/home.service';
import { NextPractice } from '../../../model/trinee-data';

Chart.register(...registerables);

@Component({
  selector: 'app-trainee-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trainee-chart.component.html',
  styleUrl: './trainee-chart.component.scss',
  providers: [DatePipe] // Provide DatePipe here

})
export class TraineeChartComponent implements OnInit, AfterViewInit {

  // Inject HomeService to interact with backend
  private _homeService = inject(HomeService);
  private _DatePipe = inject(DatePipe);
  nextPractice:NextPractice={
    title:'Practice name',
    note:' note note note note note note note note notenot e n o te vnotenotenoteno tenotenotenot enotenot enotenotenote note note note',
    time:'2024-09-03T16:50:36.516Z',
    meetingLink: "https://icpc.runasp.net/swagger/index.html",

  }as NextPractice

  // Lifecycle hook for initialization
  ngOnInit(): void {
    // this.loadNextPracticeData(); // Load data when component initializes
  }

  // Lifecycle hook that runs after view initialization
  ngAfterViewInit(): void {
    this.renderChart(); // Render the chart after view initialization
  }

  // Function to create and render the doughnut chart
  renderChart(): void {
    const myChart = new Chart('chart', {
      type: 'doughnut',
      data: {
        labels: ['Labels'], // Data labels
        datasets: [
          {
            data: [100], // Data values
            label: 'All Problems',
            backgroundColor: ['#E5E5E5'], // Segment colors
            borderColor: 'transparent',
            borderWidth: 0,
            borderRadius: 12,
          },
        ],
      },
      options: {
        cutout: '85%', // Cutout percentage for doughnut
        responsive: true,
        maintainAspectRatio: false,
        hover: {
          mode: null, // Disable hover mode
        },
        plugins: {
          legend: {
            display: false, // Hide legend
          },
          tooltip: {
            callbacks: {
              title: () => '', // Hide tooltip title
            },
          },
          title: {
            display: false, // Hide chart title
          },
        },
      } as any,

      plugins: [
        this.createDoughnutBackgroundPlugin('#fff'), // Custom plugin for background
      ],
    });
  }

  // Method to create a custom plugin for doughnut chart background
  createDoughnutBackgroundPlugin(backgroundColor: string): Plugin {
    return {
      id: 'doughnutBackgroundPlugin',
      beforeDraw: (chart) => {
        const { ctx, chartArea } = chart;
        const { top, bottom, left, right } = chartArea;
        const width = right - left;
        const height = bottom - top;
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const meta = chart.getDatasetMeta(0).data[0] as any;
        const cutout = (chart.config.options as any).cutout || '85%';
        const cutoutRadius = (meta.outerRadius * parseFloat(cutout)) / 85;

        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, cutoutRadius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = backgroundColor;
        ctx.fill();
        ctx.restore();
      },
    };
  }

  // Function to copy text to clipboard
  copyText(link: string): void {
    navigator.clipboard.writeText(link); // Copy link to clipboard
  }

  formatDateTime(dateTimeString: string): string {
    if (!dateTimeString) return '';

    // Parse the ISO string into a Date object
    const date = new Date(dateTimeString);

    // Format the date and time
    const dayOfWeek = this._DatePipe.transform(date, 'EEEE'); // Sunday
    const day = this._DatePipe.transform(date, 'd');          // 2
    const month = this._DatePipe.transform(date, 'M');         // 9
    const year = this._DatePipe.transform(date, 'yyyy');       // 2024
    const time = this._DatePipe.transform(date, 'h:mm a');     // 9 AM

    // Construct and return the formatted string
    return `${dayOfWeek} ${day}/${month}/${year} Starts at ${time}`;
  }

  // Function to load data for next practice
  // loadNextPracticeData(): void {
  //   this._homeService.nextPractice().subscribe({
  //     next: ({ statusCode, data }) => {
  //       if (statusCode === 200) {
  //         this.nextPractice= data // assign data
  //       }
  //     }
  //   });
  // }
}
