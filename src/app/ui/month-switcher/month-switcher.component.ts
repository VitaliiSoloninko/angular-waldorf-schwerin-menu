import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-month-switcher',
  imports: [CommonModule],
  templateUrl: './month-switcher.component.html',
  styleUrl: './month-switcher.component.scss',
})
export class MonthSwitcherComponent {
  currentMonth: number = DateTime.now().month;
  currentYear: number = DateTime.now().year;

  @Output() monthChanged = new EventEmitter<{ month: number; year: number }>();

  goToNextMonth(): void {
    if (this.currentMonth === 12) {
      this.currentMonth = 1;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.emitMonthChange();
  }

  goToPreviousMonth(): void {
    if (this.currentMonth === 1) {
      this.currentMonth = 12;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.emitMonthChange();
  }

  goToCurrentMonth(): void {
    this.currentMonth = DateTime.now().month;
    this.currentYear = DateTime.now().year;
    this.emitMonthChange();
  }

  private emitMonthChange(): void {
    this.monthChanged.emit({
      month: this.currentMonth,
      year: this.currentYear,
    });
  }
}
