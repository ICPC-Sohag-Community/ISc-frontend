import { Component, inject } from '@angular/core';
import { HomeService } from '../../Services/home.service';
import { CurrentSheet, InComingContest, NextSession } from '../../model/trinee-data';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-trainee-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trainee-cards.component.html',
  styleUrl: './trainee-cards.component.scss',
  providers: [DatePipe]

})
export class TraineeCardsComponent {

  // Injected services
  private homeService = inject(HomeService);
  private datePipe = inject(DatePipe);

  // Component state variables
  public currentSheet: CurrentSheet = {
    endDate:'',
    name:'No sheet',
    problemCount:0,
    problemSolvedCount:0,
    id:0,
    sheetLink:'no Links',
    startDate:''
  };
  public inComingContest: InComingContest = {
    name: 'No Contest In Coming',
    link: 'none',
    remainTime: {
      hours: 0,
      minutes: 0,
      seconds: 0
    }
  } as InComingContest;
  public nextSession: NextSession = {
    campId:0,
    id:0,
    locationLink:'',
    startDate:'',
    topic:'No Sessions',
    instructorName:'Null',
    endDate:'',
    locationName:'Null'
  };

  // Lifecycle hook: Initializes the component
  ngOnInit(): void {
    this.loadSheetData();   // Load current sheet data
    this.loadContestData(); // Load incoming contest data
    this.loadSessionData(); // Load next session data
  }

  // Fetches the current sheet data from the service
  private loadSheetData(): void {
    this.homeService.TraineeCurrentSheet().subscribe({
      next: ({ statusCode, data }) => {
        if (statusCode === 200) {
          this.currentSheet = data; // Update the state with fetched data
        }
      }
    });
  }

  // Fetches the incoming contest data from the service
  private loadContestData(): void {
    this.homeService.TraineeIncomingContest().subscribe({
      next: ({ statusCode, data }) => {
        if (statusCode === 200) {
          this.inComingContest = data; // Update the state with fetched data
        }
      }
    });
  }

  // Fetches the next session data from the service
  private loadSessionData(): void {
    this.homeService.TraineeNextSession().subscribe({
      next: ({ statusCode, data }) => {
        if (statusCode === 200) {
          this.nextSession = data; // Update the state with fetched data
        }
      }
    });
  }

  // Converts a date string into a readable format
  // Example: "2024-08-22T10:00:00" -> "August 22, 2024"
  public convertDate(dateString: string): string {
    return this.datePipe.transform(dateString, 'MMMM d, y') || '';
  }

  // Formats event start and end dates into a human-readable string
  // Example: (startDate, endDate) -> "Thursday 22/08 Starting from 10:00 AM to 04:00 PM"
  public formatEventDates(startDate: string, endDate: string): string {
    if(startDate && endDate){
      const start = new Date(startDate);
    const end = new Date(endDate);

    // Extract day of the week
    const day = start.toLocaleString('en-US', { weekday: 'long' });

    // Format the date to "dd/mm" without the year
    const datePart = start.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' });

    // Format the start time in 12-hour format with AM/PM
    const startTime = start.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    // Format the end time in 12-hour format with AM/PM
    const endTime = end.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    // Combine all parts into the final string
    return `${day} ${datePart} Starting from ${startTime} to ${endTime}`;
    }
    else{
      return 'No Date'
    }
  }

  // Opens a given URL in a new browser tab
  public openLink(url: string): void {
    window.open(url, '_blank');
  }
}

