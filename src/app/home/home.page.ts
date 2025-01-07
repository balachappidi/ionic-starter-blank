import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonItem, IonDatetime, IonHeader, IonToolbar, IonTitle, IonContent, IonPopover, IonInput, IonButton, IonLabel, IonList } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonList, IonLabel, IonButton, IonInput, IonPopover, IonItem, IonDatetime, IonHeader, IonToolbar, IonTitle, IonContent, CommonModule, FormsModule],
})
export class HomePage {

  minDate: Date;
  yearRange: string[];
  minDateStr: string;
  selectedDate: string = '';
  displayedDates: {
    today: Date;
    yesterday: Date;
    tenDaysPast: Date;
    oneYearPast: Date;
  } | null = null;

  constructor() {
    this.minDate = new Date();
    // this.minDate.setDate(this.minDate.getDate() + 1);
    const currentYear = this.minDate.getFullYear();
    this.yearRange = Array.from({ length: 6 }, (_, i) => (currentYear + i).toString());
    this.minDateStr = this.minDate.toISOString().split('T')[0]; // "YYYY-MM-DD"
  
  }

  onDateChange(event: any) {
    console.log('Selected Date:', this.selectedDate);
  }

  formatDate(date: string): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  }

  onSubmit() {
    if (!this.selectedDate) {
      alert('Please select a date!');
      return;
    }

    const selectedDateObj = new Date(this.selectedDate);

    this.displayedDates = {
      today: new Date(), // Today's date
      yesterday: this.calculateDaysFromDate(new Date(), 1), // Yesterday
      tenDaysPast: this.calculateDaysFromDate(selectedDateObj, 10), // 10 days past selected date
      oneYearPast: this.calculateYearsFromDate(selectedDateObj, 1), // 1 year past selected date
    };
  }
  
  private calculateDaysFromDate(baseDate: Date, days: number): Date {
    const result = new Date(baseDate);
    result.setDate(result.getDate() - days);
    return result;
  }

  private calculateYearsFromDate(baseDate: Date, years: number): Date {
    const result = new Date(baseDate);
    result.setFullYear(result.getFullYear() - years);
    return result;
  }
  
}
