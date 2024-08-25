import { Component, inject } from '@angular/core';
import { SheetsComponent } from '../../Components/Sheets-Components/sheets/sheets.component';

@Component({
  selector: 'app-sheets-trainee',
  standalone: true,
  imports: [SheetsComponent],
  templateUrl: './sheets-trainee.component.html',
  styleUrl: './sheets-trainee.component.scss'
})
export class SheetsTraineeComponent {
  isLoading = true; // Initially show the loader

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 350);
  }
}
