import { Component } from '@angular/core';

import { WeekCalendarComponent } from '../../ui/week-calendar/week-calendar.component';

@Component({
  selector: 'app-menu-page',
  imports: [WeekCalendarComponent],
  templateUrl: './menu-page.component.html',
  styleUrl: './menu-page.component.scss',
})
export class MenuPageComponent {}
