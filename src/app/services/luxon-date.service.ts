import {
  computed,
  Injectable,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { DateTime, Info, Interval } from 'luxon';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LuxonDateService {
  private currentWeekSubject = new BehaviorSubject<DateTime>(
    DateTime.local().startOf('week')
  );
  currentWeek$ = this.currentWeekSubject.asObservable();
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
    const previousWeek = this.firstDayOfActiveWeek().minus({ weeks: 1 });
    this.firstDayOfActiveWeek.set(previousWeek);
    this.currentWeekSubject.next(previousWeek);
    // this.firstDayOfActiveWeek.set(
    //   this.firstDayOfActiveWeek().minus({ weeks: 1 })
    // );
  }
  goToNextWeek() {
    const previousWeek = this.firstDayOfActiveWeek().plus({ weeks: 1 });
    this.firstDayOfActiveWeek.set(previousWeek);
    this.currentWeekSubject.next(previousWeek);
  }
  goToActiveWeek() {
    this.firstDayOfActiveWeek.set(this.today().startOf('week'));
    this.currentWeekSubject.next(this.today().startOf('week'));
  }
}
