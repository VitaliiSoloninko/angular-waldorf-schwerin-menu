import { CommonModule, NgFor } from '@angular/common';
import {
  Component,
  computed,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ChevronDown, LucideAngularModule, Vegan } from 'lucide-angular';
import { DateTime, Info, Interval } from 'luxon';
import { FoodService } from '../../services/food.service';

import { Food } from '../../models/food.model';
import { CartService } from '../../services/cart.service';
import { CheckBoxComponent } from '../../ui/check-box/check-box.component';

@Component({
  selector: 'app-week-calendar',
  imports: [
    CommonModule,
    RouterLink,
    NgFor,
    LucideAngularModule,
    CheckBoxComponent,
  ],
  templateUrl: './week-calendar.component.html',
  styleUrl: './week-calendar.component.scss',
  exportAs: 'weekCalendar',
})
export class WeekCalendarComponent {
  showItem = true;

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

  constructor(
    private foodService: FoodService,
    private cartService: CartService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.foodService.getAllFoods().subscribe((foods) => {
      this.foodItems = foods;
    });
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
    this.cartService.addToCart(this.foodItems[0]);
    this.cartService.addToCart(this.foodItems[1]);
    this.cartService.addToCart(this.foodItems[2]);
    this.cartService.addToCart(this.foodItems[3]);
    this.cartService.addToCart(this.foodItems[4]);
    this.router.navigateByUrl('/cart-page');
  }
}
