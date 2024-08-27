import { Component, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ContestService } from '../../../Services/contest.service';
import { nextContest } from '../../../model/trinee-contest';
import { FormatDatePipe } from '../../../Pipes/formatte-Date.pipe';

@Component({
  selector: 'app-next-contest',
  standalone: true,
  imports: [FormatDatePipe],
  templateUrl: './next-contest.component.html',
  styleUrls: ['./next-contest.component.scss'],
})
export class NextContestComponent implements OnInit {
  // Inject the ContestService
  private _contestService = inject(ContestService);

  // Initialize nextContest object with default values
  public nextContest: nextContest = {
  } as nextContest;

  // Lifecycle hook for component initialization
  ngOnInit(): void {
    this.loadContestData(); // Load contest data on initialization
  }

  // Method to load contest data from the ContestService
  private loadContestData(): void {
    this._contestService.nextContest.subscribe({
      next: (response) => {
        this.nextContest = response; // Update the nextContest object with the response data
      },
    });
  }

  // Method to open the contest link in a new tab
  public openLink(url: string): void {
    window.open(url, '_blank');
  }
}
