import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'utcToLocal',
  standalone: true,
})
export class UtcToLocalPipe implements PipeTransform {
  transform(value: string | Date): string {
    if (!value) return '';

    // Convert the input value to a Date object
    const utcDate = new Date(value);

    // Get the local timezone offset in minutes
    const timezoneOffset = utcDate.getTimezoneOffset(); // This is in minutes

    // Adjust the UTC date by adding the local timezone offset
    // Since getTimezoneOffset returns the offset in minutes (UTC - local),
    // we need to subtract it from the UTC date to get local time.
    // utcDate.setMinutes(utcDate.getMinutes() - timezoneOffset);

    // Format the adjusted date as per your requirements
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    };

    const formattedDate = utcDate.toLocaleString('en-US', options);

    return formattedDate;
  }
}
