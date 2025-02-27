import {
  computed,
  Injectable,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { DateTime, Info, Interval } from 'luxon';

@Injectable({
  providedIn: 'root',
})
export class LuxonDateService {
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
  constructor() {}

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
}
