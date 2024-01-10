import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timestampToDate',
})
export class TimestampToDatePipe implements PipeTransform {
  transform(timestamp: any): Date {
    return new Date(timestamp.seconds * 1000); // Convertir les secondes en millisecondes
  }
}
