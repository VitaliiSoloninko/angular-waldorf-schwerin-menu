import { CommonModule, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ChevronDown, LucideAngularModule, Vegan } from 'lucide-angular';
import { DateTime } from 'luxon';
import { Subscription } from 'rxjs';
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

  DATE_MED = DateTime.DATE_MED;
  showDetails: boolean = true;
  isCheckboxDisabled: boolean = false;
  private weekSubscription: Subscription;

  constructor(
    private foodService: FoodService,
    private luxonDateService: LuxonDateService
  ) {}

  ngOnInit(): void {
    this.weekSubscription = this.luxonDateService.currentWeek$.subscribe(() => {
      this.updateDate();
    });
  }

  ngOnDestroy(): void {
    if (this.weekSubscription) {
      this.weekSubscription.unsubscribe();
    }
  }

  updateDate(): void {
    const currentWeek = this.luxonDateService.firstDayOfActiveWeek();
    const calculatedDate = currentWeek
      .plus({ days: this.food.day - 1 })
      .toFormat('dd.MM.yyyy');

    this.date = {
      day: calculatedDate,
      dayOfTheWeek:
        currentWeek.plus({ days: this.food.day - 1 }).weekdayLong || '',
    };

    this.food.date = calculatedDate;
    this.checkIfCheckboxShouldBeDisabled();
  }

  checkIfCheckboxShouldBeDisabled(): void {
    const now = DateTime.local({ zone: 'Europe/Berlin', locale: 'de' });
    const foodDate = DateTime.fromFormat(this.food.date, 'dd.MM.yyyy');
    const isToday8AM = now.hasSame(foodDate, 'day') && now.hour > 8;

    if (foodDate < now.startOf('day') || isToday8AM) {
      this.isCheckboxDisabled = true;
    } else {
      this.isCheckboxDisabled = false;
    }
  }

  onCheckboxChange(): void {
    this.foodChecked.emit(this.food);
  }
}
