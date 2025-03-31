export interface Order {
  id: number | undefined;
  foodId: number;
  foodName: string;
  foodPrice: number;
  userId: number;
  date: string;
  day: number;
  week: number;
  month: number;
  year: number;
  checked: boolean;
}
