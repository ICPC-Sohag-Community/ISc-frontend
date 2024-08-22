import { Component } from '@angular/core';
import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
  Plugin,
  registerables,
} from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-trainee-chart',
  standalone: true,
  imports: [],
  templateUrl: './trainee-chart.component.html',
  styleUrl: './trainee-chart.component.scss'
})
export class TraineeChartComponent {
 ngAfterViewInit(): void {

    this.renderChart();
  }



  // createChart() {
  //   const ctx = (document.getElementById('doughnutChart') as HTMLCanvasElement).getContext('2d');
  //   const gradient = ctx!.createLinearGradient(0, 0, 0, 400);
  //   gradient.addColorStop(0, '#471B54'); // Start color
  //   gradient.addColorStop(1, '#FFFFFF'); // End color
  //   const data:any = {
  //     datasets: [
  //       {
  //         label: 'Full',
  //         data: [100, 0], // 100% and the rest is empty space
  //         backgroundColor: ['#E5E5E5', 'transparent'],
  //         borderWidth: 0,
  //         borderRadius: 20, // Radius at the end of each segment

  //       },
  //       {
  //         label: 'Minimum Problem',
  //         data: [80, 20], // 80% and the rest is empty space
  //         backgroundColor: ['#EF4A50', 'transparent'],
  //         borderWidth: 0,
  //         borderRadius: 20, // Radius at the end of each segment

  //       },
  //       {
  //         label: 'Actual Problem Solved',
  //         data: [60, 40], // 60% and the rest is empty space
  //         backgroundColor: [gradient, 'transparent'],
  //         borderWidth: 0,
  //         borderRadius: 20, // Radius at the end of each segment
  //       }

  //     ]
  //   };

  //   const option:any = {
  //     responsive: true,
  //     cutout:"30%",
  //     plugins: {
  //       legend: {
  //         display: false,
  //       },
  //       tooltip: {
  //         callbacks: {
  //           label: function (tooltipItem: { dataset: { label: string; }; raw: string; }) {
  //             return tooltipItem.dataset.label + ': ' + tooltipItem.raw + '%';
  //           }
  //         }
  //       }
  //     }
  //   }
  //   // plugins: [

  //   // ]
  //   ;

  //   new Chart(ctx!, {
  //     type: 'doughnut',
  //     data: data,
  //     options: option
  //   });
  // }
  renderChart(): void {
    const myChart = new Chart('chart', {
      type: 'doughnut',
      data: {
        labels: ['lables'],

        datasets: [
          {
            data: [100],
            label: 'All Problems',
            backgroundColor: ['#E5E5E5'],
            borderColor: 'transparent',
            borderWidth: 0,
            borderRadius: 12,
          },
        ],
      },
      options: {
        cutout: '85%',
        responsive: true,
        maintainAspectRatio: false,
        hover: {
          mode: null,
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              title: () => '',
            },
          },
          title: {
            display: false,
          },
        },
      } as any,

      plugins: [
        this.createDoughnutBackgroundPlugin('#fff'),
      ],
    });
  }
  ctx = document.getElementById('chart') as HTMLCanvasElement;

  createDoughnutBackgroundPlugin(backgroundColor: string): Plugin {
    return {
      id: 'doughnutBackgroundPlugin',
      beforeDraw: (Chart) => {
        const { ctx, chartArea } = Chart;
        const { top, bottom, left, right } = chartArea;
        const width = right - left;
        const height = bottom - top;
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const meta = Chart.getDatasetMeta(0).data[0] as any;
        const cutout = (Chart.config.options as any).cutout || '85%';
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


  text:string ='meet.google.com/lklkjfsjhdsjfdkjfhdskf'
  copyText(link:string) {

    /* Copy text into clipboard */
    navigator.clipboard.writeText
        (link);
}
}
