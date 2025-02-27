import { CommonModule, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ChevronDown, LucideAngularModule, Vegan } from 'lucide-angular';
import { DateTime } from 'luxon';
import { Date } from '../../models/date.model';
import { Food } from '../../models/food.model';
import { FoodService } from '../../services/food.service';
import { LuxonDateService } from '../../services/luxon-date.service';
import { CheckBoxComponent } from '../../ui/check-box/check-box.component';

@Component({
  selector: 'app-food-item',
  imports: [
    CommonModule,
    RouterLink,
    NgFor,
    LucideAngularModule,
    CheckBoxComponent,
    FormsModule,
  ],
  templateUrl: './food-item.component.html',
  styleUrl: './food-item.component.scss',
})
export class FoodItemComponent {
  @Input() food: Food;
  @Input() date: Date;

  chevronDown: any = ChevronDown;
  vegan: any = Vegan;

  showDetails: boolean = true;
  DATE_MED = DateTime.DATE_MED;

  constructor(
    private foodService: FoodService,
    private luxonDateService: LuxonDateService
  ) {}

  firstDayOfActiveWeek(): DateTime {
    return this.luxonDateService.firstDayOfActiveWeek();
  }

  ngOnInit(): void {
    this.date = {
      day: this.firstDayOfActiveWeek()
        .plus({ days: this.food.day - 1 })
        .toLocaleString(this.DATE_MED),
      dayOfTheWeek:
        this.firstDayOfActiveWeek().plus({ days: this.food.day - 1 })
          .weekdayLong || '',
    };
  }
}
