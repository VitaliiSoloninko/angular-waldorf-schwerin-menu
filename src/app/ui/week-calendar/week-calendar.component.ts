import { CommonModule, NgFor } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

import { LuxonDateService } from '../../services/luxon-date.service';
import { FoodItemComponent } from '../food-item/food-item.component';

@Component({
  selector: 'app-week-calendar',
  imports: [
    CommonModule,
    RouterLink,
    NgFor,
    LucideAngularModule,
    FoodItemComponent,
  ],
  templateUrl: './week-calendar.component.html',
  styleUrl: './week-calendar.component.scss',
  exportAs: 'weekCalendar',
})
export class WeekCalendarComponent {
  @Output() weekChanged = new EventEmitter<number>();
  constructor(private luxonDateService: LuxonDateService) {}

  activeDay() {
    return this.luxonDateService.activeDay();
  }

  firstDayOfActiveWeek() {
    return this.luxonDateService.firstDayOfActiveWeek();
  }

  daysOfWeek() {
    return this.luxonDateService.daysOfWeek();
  }

  weekDays() {
    return this.luxonDateService.weekDays();
  }

  goToPreviousWeek() {
    this.luxonDateService.goToPreviousWeek();
    this.weekChanged.emit(
      this.luxonDateService.firstDayOfActiveWeek().weekNumber
    );
  }
  goToNextWeek() {
    this.luxonDateService.goToNextWeek();
    this.weekChanged.emit(
      this.luxonDateService.firstDayOfActiveWeek().weekNumber
    );
  }
  goToActiveWeek() {
    this.luxonDateService.goToActiveWeek();
    this.weekChanged.emit(
      this.luxonDateService.firstDayOfActiveWeek().weekNumber
    );
  }
}
