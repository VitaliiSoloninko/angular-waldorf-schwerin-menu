import { Date } from './date.model';
import { Food } from './food.model';

export class CartItem {
  quantity: number = 1;
  price: number = 0;
  day: string = '';
  dayOfTheWeek: string = '';
  constructor(public food: Food, public date: Date) {
    this.price = food.price;
    this.day = date.day;
    this.dayOfTheWeek = date.dayOfTheWeek;
  }
}
