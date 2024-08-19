import { Component, AfterViewInit } from '@angular/core';
import { Chart, registerables, Plugin } from 'chart.js';

@Component({
  selector: 'app-dash',
  standalone: true,
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements AfterViewInit {

  ngAfterViewInit() {
    // Register the Chart.js components and custom plugin globally
    Chart.register(...registerables, this.createCenterTextPlugin());

    this.trainee();
    this.mentor();
    this.hor();
    this.sheet();
    this.avg();
  }

  createCenterTextPlugin(
    text: string = '40%',
    font: string = 'bold 24px Arial',
    color: string = 'black'
  ): Plugin {
    return {
      id: 'centerTextPlugin',
      beforeDraw: (chart) => {
        // Check if the chart is the one that should have the center text
        if (chart.canvas.id !== 'prog') return; // Replace 'prog' with the ID of the chart you want to target

        const { ctx, chartArea } = chart;
        const { top, bottom, left, right } = chartArea;
        const width = right - left;
        const height = bottom - top;
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = font;
        ctx.fillStyle = color;
        ctx.fillText(text, centerX, centerY);
        ctx.restore();
      },
    };
  }

  trainee() {
    const ctx = (document.getElementById('mentor') as HTMLCanvasElement)?.getContext('2d');

    if (ctx) {
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Female', 'Male'],
          datasets: [{
            data: [20, 80],
            backgroundColor: ['#EA5CD2', '#3D91C7'],
            borderColor: "transparent"
          }]
        },
        options: {
          responsive: true,
          spacing: -10,
          plugins: {
            legend: {
              position: 'bottom',
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  return `${tooltipItem.label}: ${tooltipItem.raw}%`;
                }
              }
            }
          },
          elements: {
            arc: {
              borderRadius: 10, // Optional: Set border radius if needed
            }
          },
          cutout: '80%'
        }
      });
    } else {
      console.error('Failed to get canvas context');
    }
  }

  mentor() {
    const ctx = (document.getElementById('doughnut') as HTMLCanvasElement)?.getContext('2d');

    if (ctx) {
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Female', 'Male'],
          datasets: [{
            data: [20, 80],
            backgroundColor: ['#EA5CD2', '#3D91C7'],
            borderColor: "transparent",
          }]
        },
        options: {
          responsive: true,
          spacing: -10,
          plugins: {
            legend: {
              position: 'bottom',
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  return `${tooltipItem.label}: ${tooltipItem.raw}%`;
                }
              }
            }
          },
          elements: {
            arc: {
              borderRadius: 10, // Optional: Set border radius if needed
            }
          },
          cutout: '80%'
        }
      });
    } else {
      console.error('Failed to get canvas context');
    }
  }

  hor() {
    const ctx = (document.getElementById('prog') as HTMLCanvasElement)?.getContext('2d');

    if (ctx) {
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: [],
          datasets: [{
            data: [60, 40],
            backgroundColor: ['#E6E6E6', '#3D91C7'],
            borderColor: ["transparent", "#CEE3F1"],
          }]
        },
        options: {
          responsive: true,
          spacing: -10,
          rotation:180,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  return `${tooltipItem.label}: ${tooltipItem.raw}%`;
                }
              }
            }
          },
          elements: {
            arc: {
              borderRadius: 10, // Optional: Set border radius if needed
              
            }
          },
          cutout: '80%'
        }
      });
    } else {
      console.error('Failed to get canvas context');
    }
  }
  sheet() {
    const ctx = (document.getElementById('sheet') as HTMLCanvasElement)?.getContext('2d');

    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['sheet 1', 'sheet 2','sheet 3','sheet 4','sheet 5','sheet 6','sheet 7','sheet 8','sheet 9','sheet 10','sheet 11','sheet 12'],
          datasets: [{
            data: [20, 80,12,50,60,35,12,17,88,95,100,30],
            backgroundColor: '#3D91C7',
            borderColor: "#3D91C7",
            borderRadius:6
          }]
        },
        options: {
          responsive: true,
          
          plugins: {
            legend: {
              display:false
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  return `${tooltipItem.label}: ${tooltipItem.raw}%`;
                }
              }
            }
          },
          elements: {
            arc: {
              borderRadius: 15, // Optional: Set border radius if needed
            }
          },
         
        }
      });
    } else {
      console.error('Failed to get canvas context');
    }
  }
  avg() {
    const ctx = (document.getElementById('avg') as HTMLCanvasElement)?.getContext('2d');

    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: [,'Dynamic ','Dynamic ','Dynamic ','Dynamic ','Dynamic '],
          datasets: [{
            data: [,20, 80,60,50,30],
            backgroundColor: '#3D91C7',
            borderColor: "#3D91C7",
            
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              min: 0, 
            }
          },
          plugins: {
            legend: {
              display:false
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  return `${tooltipItem.label}: ${tooltipItem.raw}%`;
                }
              }
            }
          },
          elements: {
            arc: {
              borderRadius: 15, // Optional: Set border radius if needed
            }
          },
         
        }
      });
    } else {
      console.error('Failed to get canvas context');
    }
  }
}
