export interface Food {
  id: number;
  day: number;
  week: number;
  name: string;
  price: number;
  description: string;
  image: string;
  date: string;
  checked: boolean;
  initialChecked?: boolean;
}
