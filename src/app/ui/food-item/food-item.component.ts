import { CommonModule, NgFor } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
  Signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ChevronDown, LucideAngularModule, Vegan } from 'lucide-angular';
import { DateTime } from 'luxon';
import { Date } from '../../models/date.model';
import { Food } from '../../models/food.model';
import { FoodService } from '../../services/food.service';
import { LuxonDateService } from '../../services/luxon-date.service';

@Component({
  selector: 'app-food-item',
  imports: [CommonModule, RouterLink, NgFor, LucideAngularModule, FormsModule],
  templateUrl: './food-item.component.html',
  styleUrl: './food-item.component.scss',
})
export class FoodItemComponent {
  @Input() food: Food;
  @Input() date: Date;
  @Output() foodChecked = new EventEmitter<Food>();

  chevronDown: any = ChevronDown;
  vegan: any = Vegan;

  showDetails: boolean = true;
  DATE_MED = DateTime.DATE_MED;
  isCheckboxDisabled: boolean = false;

  constructor(
    private foodService: FoodService,
    private luxonDateService: LuxonDateService
  ) {}

  today: Signal<DateTime> = signal(
    DateTime.local({
      zone: 'Europe/Berlin',
      locale: 'de',
    })
  );

  firstDayOfActiveWeek(): DateTime {
    return this.luxonDateService.firstDayOfActiveWeek();
  }

  ngOnInit(): void {
    const calculatedDate = this.firstDayOfActiveWeek()
      .plus({ days: this.food.day - 1 })
      .toLocaleString(this.DATE_MED);

    this.date = {
      day: calculatedDate,
      dayOfTheWeek:
        this.firstDayOfActiveWeek().plus({ days: this.food.day - 1 })
          .weekdayLong || '',
    };

    this.food.date = calculatedDate;
    this.checkIfCheckboxShouldBeDisabled();
  }

  checkIfCheckboxShouldBeDisabled(): void {
    const now = DateTime.local({ zone: 'Europe/Berlin', locale: 'de' });
    const presentDay = now.toLocaleString(DateTime.DATE_MED);
    const foodDate = this.food.date;
    let isToday8AM = now.hasSame(now, 'day') && now.hour > 8;

    if (foodDate < presentDay || (foodDate == presentDay && isToday8AM)) {
      this.isCheckboxDisabled = true;
    }
  }

  onCheckboxChange(): void {
    this.foodChecked.emit(this.food);
  }
}
