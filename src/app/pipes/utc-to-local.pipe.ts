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

    // Convert the UTC date to the local time zone with specific formatting
    const localDateString = utcDate.toLocaleString('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    return localDateString;
  }
}
