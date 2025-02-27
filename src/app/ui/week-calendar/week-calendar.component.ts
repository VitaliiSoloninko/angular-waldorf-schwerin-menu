import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

import { LuxonDateService } from '../../services/luxon-date.service';
import { CheckBoxComponent } from '../../ui/check-box/check-box.component';
import { FoodItemComponent } from '../food-item/food-item.component';

@Component({
  selector: 'app-week-calendar',
  imports: [
    CommonModule,
    RouterLink,
    NgFor,
    LucideAngularModule,
    CheckBoxComponent,
    FoodItemComponent,
  ],
  templateUrl: './week-calendar.component.html',
  styleUrl: './week-calendar.component.scss',
  exportAs: 'weekCalendar',
})
export class WeekCalendarComponent {
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
  }
  goToNextWeek() {
    this.luxonDateService.goToNextWeek();
  }
  goToActiveWeek() {
    this.luxonDateService.goToActiveWeek();
  }
}
