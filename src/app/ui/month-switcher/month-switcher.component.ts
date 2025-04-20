import { Component, OnInit } from '@angular/core';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-month-switcher',
  imports: [],
  templateUrl: './month-switcher.component.html',
  styleUrl: './month-switcher.component.scss',
})
export class MonthSwitcherComponent implements OnInit {
  month: string = '';

  ngOnInit(): void {
    this.month = DateTime.now().setLocale('de').toFormat('LLLL yyyy');
  }
}
