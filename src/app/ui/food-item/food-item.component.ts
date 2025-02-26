import { CommonModule, NgFor } from '@angular/common';
import {
  Component,
  computed,
  Input,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ChevronDown, LucideAngularModule, Vegan } from 'lucide-angular';
import { DateTime, Info, Interval } from 'luxon';
import { Date } from '../../models/date.model';
import { Food } from '../../models/food.model';
import { CartService } from '../../services/cart.service';
import { FoodService } from '../../services/food.service';
import { CheckBoxComponent } from '../../ui/check-box/check-box.component';

@Component({
  selector: 'app-food-item',
  imports: [
    CommonModule,
    RouterLink,
    NgFor,
    LucideAngularModule,
    CheckBoxComponent,
  ],
  templateUrl: './food-item.component.html',
  styleUrl: './food-item.component.scss',
})
export class FoodItemComponent {
  @Input() food: Food;
  @Input() date: Date;

  showDetails: boolean = true;

  today: Signal<DateTime> = signal(
    DateTime.local({
      zone: 'Europe/Berlin',
      locale: 'de',
    })
  );

  activeDay: WritableSignal<DateTime | null> = signal(null);
  weekDays: Signal<string[]> = signal(
    Info.weekdays('short', { locale: 'de' }).slice(0, 7)
  );
  firstDayOfActiveWeek: WritableSignal<DateTime> = signal(
    this.today().startOf('week')
  );

  daysOfWeek: Signal<DateTime[]> = computed(() => {
    return Interval.fromDateTimes(
      this.firstDayOfActiveWeek().startOf('week'),
      this.firstDayOfActiveWeek().startOf('week').plus({ days: 7 })
    )
      .splitBy({ days: 1 })
      .map((day) => {
        if (day.start === null) {
          throw new Error('Wrong day');
        }
        return day.start;
      });
  });

  DATE_MED = DateTime.DATE_MED;

  chevronDown: any = ChevronDown;
  vegan: any = Vegan;
  foodItems: Food[] = [];
  dates: Date[] = [];

  constructor(
    private foodService: FoodService,
    private cartService: CartService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.foodService.getAllFoods().subscribe((foods) => {
      this.foodItems = foods;
    });

    this.date = {
      day: this.firstDayOfActiveWeek()
        .plus({ days: this.food.day - 1 })
        .toLocaleString(this.DATE_MED),
      dayOfTheWeek:
        this.firstDayOfActiveWeek().plus({ days: this.food.day - 1 })
          .weekdayLong || '',
    };
  }

  goToPreviousWeek() {
    this.firstDayOfActiveWeek.set(
      this.firstDayOfActiveWeek().minus({ weeks: 1 })
    );
  }
  goToNextWeek() {
    this.firstDayOfActiveWeek.set(
      this.firstDayOfActiveWeek().plus({ weeks: 1 })
    );
  }
  goToActiveWeek() {
    this.firstDayOfActiveWeek.set(this.today().startOf('week'));
  }

  addToCart() {
    for (let i = 0; i < this.foodItems.length; i++) {
      this.cartService.addToCart(this.foodItems[i]);
    }
    this.router.navigateByUrl('/cart-page');
  }
}
