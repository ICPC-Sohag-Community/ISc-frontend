import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
// import { ChartOptions, ChartType, ChartData } from 'chart.js';
// import { NgChartsModule } from 'ng2-charts';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-trainee-home-body',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trainee-home-body.component.html',
  styleUrl: './trainee-home-body.component.scss'
})
export class TraineeHomeBodyComponent {
  // @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  // ngAfterViewInit() {
  //   const ctx = this.chartCanvas.nativeElement.getContext('2d');
  //   if (ctx) {
  //     new Chart(ctx, {
  //       type: 'doughnut',
  //       data: {
  //         labels: ['Solved', 'Remaining'],
  //         datasets: [
  //           {
  //             data: [40, 60], // 40% solved, 60% remaining
  //             backgroundColor: ['#6B21A8', '#F87171'], // colors matching Tailwind
  //             borderWidth: 0,
  //           }
  //         ]
  //       },
  //       options: {
  //         responsive: true,
  //         cutout: '70%', // Adjust the inner radius of the doughnut
  //         plugins: {
  //           legend: {
  //             display: false, // Disable the legend
  //           },
  //           tooltip: {
  //             enabled: false, // Disable tooltips
  //           }
  //         }
  //       }
  //     });
  //   }
  // }
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d')

        if(ctx){
          const gradient = ctx.createLinearGradient(0,0,0,1 );
          gradient.addColorStop(0.0776, 'rgba(71, 27, 84, 1)');
          new Chart(ctx, {
            type: 'doughnut',
            data: {
                // labels: ['Red', 'Yellow'],
                datasets: [{
                    label: 'My Dataset',
                    data: [20, 80,60],
                    backgroundColor: ['#E5E5E5', '#EF4A50',gradient], // Apply gradient
                    borderColor: '#EF4A50',
                    borderWidth: 0 ,
                    borderRadius:500,
                    rotation:225,
                    spacing:-10,

                }]
            },
            options: {
                cutout: '90%',  // Adjust the width of the doughnut
                responsive: true,
                rotation:225,
                // radius:100,
                spacing:-2,
                plugins: {
                    legend: {
                        position: 'top',

                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (context.parsed !== null) {
                                    label += ': ' + context.raw;
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
        }
    // const ctx = this.chartCanvas.nativeElement.getContext('2d');
    // if (ctx) {
    //   new Chart(ctx, {
    //     type: 'doughnut',
    //     data: {
    //       labels: ['Solved', 'Remaining'],
    //       datasets: [
    //         {
    //           data: [40, 60],
    //           backgroundColor: ['#6B21A8', '#F87171'],
    //           borderWidth: 0,
    //         },
    //       ],
    //     },
    //     options: {
    //       responsive: true,
    //       cutout: '70%',
    //       plugins: {
    //         legend: {
    //           display: false,
    //         },
    //         tooltip: {
    //           enabled: false,
    //         },
    //       },
    //     },
    //   });
    }
  }
// }
