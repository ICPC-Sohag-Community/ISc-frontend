import { Component, AfterViewInit } from '@angular/core';
import { Chart, registerables, Plugin, ChartDataset } from 'chart.js';
import { HocDashService } from '../../../authentication/services/hoc-dash.service';

@Component({
  selector: 'app-dash',
  standalone: true,
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements AfterViewInit {

  stat: any;
x:any;
coll:any;
col :any;
  constructor(private service: HocDashService) {
    console.log(this.col);
   }

  ngAfterViewInit() {
    this.getData().then(() => {
      this.trainee();
      this.mentor();
      this.hor();
      this.sheet();
      this.avg();
      this.createCenterTextPlugin();
      this.x = this.stat.data.progressPrecent;
      this.coll = this.stat.data.colleges.reduce((accumulator:any, value:any)=>accumulator+ value.count,0);
      this.col = this.stat.data.colleges;
      for (let i = 0; i < this.col.length; i++) {
        const element = this.col[i];
        let v =  document.getElementById('collage');
        let r = Math.random();
        let g = Math.random();
        let b = Math.random();
        // background-color:rgb(${r*255},${g*255},${b*255})
        if(v){let c = `  <div class="flex flex-col items-end" >
                    <div class="flex justify-between w-full  flex-row-reverse">
                        <h4 class=" text-right pb-1 pr-1 " id="f1" style="color: rgb(${r*255},${g*255},${b*255})">${(this.col[i].count +'/' + this.coll)}</h4>
                       
                    </div>
                    <div class="w-full bg-white border-gray-200 border-2 rounded-full relative h-8 mb-1 ">
                        <div class="bg-[#3D91C7] h-full rounded-full  flex items-center text-white text-sm pl-3" style="width: ${((this.col[i].count/this.coll)*100 + "%")};background-color:rgb(${r*255},${g*255},${b*255})" id="fir1"> <h4 class=" text-black text-right pb-1 pl-1 absolute" id="fc1">${element.name}</h4></div>
                      </div>
                </div>`;
          v.innerHTML+=c;
        }

          // document.getElementById('fc' + (i+1))?.append(element.name);
          // document.getElementById('f'+(i+1))?.append(this.col[i].count +'/' + this.coll);
          // document.getElementById("fir" + (i+1))?.setAttribute("style" , "width:"+((this.col[i].count/this.coll)*100 + "%"));
      }
      // document.getElementById('fc1')?.append(this.col[0].name);
      // document.getElementById('fc2')?.append(this.col[1].name);
      // document.getElementById('fc3')?.append(this.col[2].name);
      // document.getElementById('fc4')?.append(this.col[3].name);
      // document.getElementById('fc5')?.append(this.col[4].name);

      // document.getElementById('f1')?.append(this.col[0].count +'/' + this.coll);
      // document.getElementById('f2')?.append(this.col[1].count +'/' + this.coll);
      // document.getElementById('f3')?.append(this.col[2].count +'/' + this.coll);
      // document.getElementById('f4')?.append(this.col[3].count +'/' + this.coll);
      // document.getElementById('f5')?.append(this.col[4].count +'/' + this.coll);
      document.getElementById('remainDays')?.append(this.stat.data.remainDays + " remain days")

      // document.getElementById("fir")?.setAttribute("style" , "width:"+((this.col[0].count/this.coll)*100 + "%"));
      // document.getElementById("fir2")?.setAttribute("style" , "width:"+((this.col[1].count/this.coll)*100 + "%"));
      // document.getElementById("fir3")?.setAttribute("style" , "width:"+((this.col[2].count/this.coll)*100 + "%"));
      // document.getElementById("fir4")?.setAttribute("style" , "width:"+((this.col[3].count/this.coll)*100 + "%"));
      // document.getElementById("fir5")?.setAttribute("style" , "width:"+((this.col[4].count/this.coll)*100 + "%"));

      document.getElementById("pro")?.setAttribute("style" , "width:"+((this.stat.data.remainDays/this.stat.data.totalDays)*100 + "%"));
    });
   
    console.log( document.getElementById('fir'))
    Chart.register(...registerables, this.createCenterTextPlugin());
    
    
    
  }
 
  getData(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.service.getData().subscribe(dat => {
        this.stat = dat;
        console.log(this.stat.data);
        resolve();
      }, error => {
        console.error("Error fetching data", error);
        reject(error);
      });
    });
  }

  createCenterTextPlugin(
     
    text: string = `${this.x}%`,
    font: string = 'bold 24px Arial',
    color: string = 'black'
  ): Plugin {
    return {
      id: 'centerTextPlugin',
      beforeDraw: (chart) => {
        if (chart.canvas.id !== 'prog') return;

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
        ctx.fillText(`${this.x}%`, centerX, centerY);
        ctx.restore();
      },
    };
  }

  legendMargin = {
    id: "legendMargin",
    afterInit(chart: any) {
      const originalFit = chart.legend.fit;
      chart.legend.fit = function fit() {
        if (originalFit) {
          originalFit.call(this);
        }
        // this._margins.top = "60px";
        // this._margins.left = "0px";
        
      };
    }
  };

  trainee() {
    const ctx = (document.getElementById('doughnut') as HTMLCanvasElement)?.getContext('2d');
    let grad: CanvasGradient | undefined;
    if (ctx) {
       grad = ctx.createLinearGradient(0, 0, 700, 0);
       grad.addColorStop(0,"#E855CF");
     grad.addColorStop(0.1,"#F7C5EF");
    grad.addColorStop(0.2,"#E855CF");
    /* grad.addColorStop(1,"yellow");*/
  }
    if (ctx) {
      
      const Tmale = this.stat.data.trineesMaleCount;
      const Tfemale = this.stat.data.traineesFemaleCount;
      const male = (Tmale/(Tmale+Tfemale))*100;
      const female = (Tfemale/(Tmale+Tfemale))*100;
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: [' '.repeat(5) +'Female  ' + ' '.repeat(5) + Tfemale, ' '.repeat(6) + 'Male   '+ ' '.repeat(6) + Tmale],
          datasets: [{
            data: [female, male],
            backgroundColor: [grad, '#3D91C7'],
            borderColor: "transparent",
            
          }]
        },
        options: {
          responsive: true,
          spacing:-10,
          
          plugins: {
            legend: {
              align:"center",
              position: 'bottom',
              
              fullSize: true,
              labels: {
                boxWidth: 100,
                padding: 10,
                usePointStyle: true,
                pointStyle: "rectRounded",
                
                pointStyleWidth:33,
                
              }
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
              borderRadius: 10,
            }
          },
          cutout: '80%',
        },
        plugins: [this.legendMargin]
      });
    } else {
      console.error('Failed to get canvas context');
    }
  }

  mentor() {
    const ctx = (document.getElementById('mentor') as HTMLCanvasElement)?.getContext('2d');
    let grad: CanvasGradient | undefined;
    if (ctx) {
       grad = ctx.createLinearGradient(0, 0, 700, 0);
       grad.addColorStop(0,"#E855CF");
       grad.addColorStop(0.1,"#F7C5EF");
      grad.addColorStop(0.2,"#E855CF");
    /* grad.addColorStop(1,"yellow");*/
  }
    if (ctx) {
      const Mmale = this.stat.data.mentorsMaleCount;
      const Mfemale = this.stat.data.mentorsFemaleCount;
      const male = (Mmale/(Mmale+Mfemale))*100;
      const female = (Mfemale/(Mmale+Mfemale))*100;
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ["Female " + ' '.repeat(10)+ Mfemale, 'Male ' + ' '.repeat(13) + Mmale],
          datasets: [{
            data: [female, male],
            backgroundColor: [grad, '#3D91C7'],
            borderColor: "transparent"
          }]
        },
        options: {
          responsive: true,
          spacing:-10,
          
          plugins: {
            legend: {
              align:"center",
              position: 'bottom',
              
              fullSize: true,
              labels: {
                boxWidth: 100,
                padding: 10,
                usePointStyle: true,
                pointStyle: "rectRounded",
                
                pointStyleWidth:33,
                
              }
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
              borderRadius: 10,
            }
          },
          cutout: '80%',
        },
      });
    } else {
      console.error('Failed to get canvas context');
    }
  }

  hor() {
    const ctx = (document.getElementById('prog') as HTMLCanvasElement)?.getContext('2d');
    const x = this.stat.data.progressPrecent;
    console.log(x);
    if (ctx) {
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: [],
          datasets: [{
            data: [100-x, x],
            backgroundColor: ['#E6E6E6', '#3D91C7'],
            borderColor: ["transparent", "#CEE3F1"],
            
          }]
        },
        options: {
          spacing:-12,
          responsive: true,
          rotation: 180,
          
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
              borderRadius: 15,
            },
            
          },
          cutout: '70%',
        }
      });
    } else {
      console.error('Failed to get canvas context');
    }
  }

  sheet() {
    const sh = this.stat.data.sheetsAnalysis;
    const s = this.stat.data.sheetsAnalysis;
   let x =  sh.map((sh: { name: any; }) => sh.name);
   
let y = [];
   for (let i = 0; i < s.length; i++) {
    const element = s[i].precent;
    y.push(element);
   }
   console.log(y);
    const ctx = (document.getElementById('sheet') as HTMLCanvasElement)?.getContext('2d');
    Chart.defaults.color = "#C4C4C4";
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: x,
          datasets: [{
            data: y,
            backgroundColor: '#3D91C7',
            borderColor: "#3D91C7",
            borderRadius: 6,
            barThickness:46,
            
          }]
        },
        options: {
          layout:{
            
          }
          ,
          responsive: true,
          scales: {
            
            y: {
              min: 0,
              max: 100,
              
            },
            x: {
              grid: {
                display: false
              },
              
            }
          },
          plugins: {
            
            legend: {
              display: false,
              labels:{
                boxWidth: 20,
                padding: 10,
                
              }
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
              borderRadius: 15,
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
    const sh = this.stat.data.contestsAnalysis;
    const s = this.stat.data.contestsAnalysis;
   let x =  sh.map((sh: { name: any; }) => sh.name);
   x.unshift(null);
let y = [];
y.push(null);
   for (let i = 0; i < s.length; i++) {
    const element = s[i].precent;
    y.push(element);
   }
   
   console.log(y);
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: x,
          datasets: [{
            data: y,
            backgroundColor: '#3D91C7',
            borderColor: "#3D91C7",
            pointStyle: 'circle',
      pointRadius: 5,
      pointHoverRadius: 6
          }]
        },
        options: {
          responsive: true,
          color:'#C4C4C4',
          scales: {
            y: {
              min: 0,
              max: 100,
            },
            x: {
              grid: {
                display: false
              }
            }
          },
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
              borderRadius: 15,
            }
          },
          
        }
      });
    } else {
      console.error('Failed to get canvas context');
    }
  }
}
