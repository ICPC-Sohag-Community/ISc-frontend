import { Component, inject, OnInit } from '@angular/core';
import { SheetsService } from '../../../Services/sheets.service';
import { Matrial, Sheet } from '../../../model/trinee-sheets';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-sheets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sheets.component.html',
  styleUrls: ['./sheets.component.scss'],
  providers: [DatePipe]
})
export class SheetsComponent implements OnInit {

  // Inject services and dependencies
  private _sheetService = inject(SheetsService);
  private datePipe = inject(DatePipe);

  // Arrays to hold sheets and materials data
  sheetMatrial: Matrial[] = [];
  sheets: Sheet[] = [];
  matrialName: string = '';

  // Lifecycle hook that runs after the component initializes
  ngOnInit(): void {
    this.loadSheets(); // Load sheets when the component initializes
  }

  // Fetches all sheets from the service
  loadSheets(): void {
    this._sheetService.getAllSheets().subscribe({
      next: ({ statusCode, data }) => {
        if (statusCode === 200) {
          this.sheets = data; // Update sheets array with fetched data
        }
      },
      error: (err) => console.error('Error loading sheets:', err) // Handle errors
    });
  }

  // Fetches material data for a specific sheet by ID and sets the material name
  updateMatrial(id: any, matrialName: string): void {
    this.matrialName = matrialName; // Set the name of the selected material
    this._sheetService.getMatrialInSheet(id).subscribe({
      next: ({ statusCode, data }) => {
        if (statusCode === 200) {
          this.sheetMatrial = data; // Update sheetMatrial array with fetched data
        }
      },
      error: (err) => console.error('Error loading material:', err) // Handle errors
    });
  }

  // Converts a date string into a readable format
  // Example: "2024-08-22T10:00:00" -> "August 22, 2024"
  public convertDate(dateString: string): string {
    return this.datePipe.transform(dateString, 'MMMM d, y') || ''; // Transform date or return an empty string if transformation fails
  }

  // Opens a material link in a new tab
  public openLinkMatrial(url: string): void {
    window.open(url, '_blank'); // Open the URL in a new browser tab
  }
}
