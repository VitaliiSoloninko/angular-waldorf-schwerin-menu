import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { OrderTable } from './order-table.model';

@Component({
  selector: 'app-order-table',
  imports: [CurrencyPipe],
  templateUrl: './order-table.component.html',
  styleUrl: './order-table.component.scss',
})
export class OrderTableComponent {
  results: OrderTable[] = [
    {
      number: 1,
      data: '07.01.2025',
      day: 'Dienstag',
      menu: '2',
      price: '4',
    },
    {
      number: 2,
      data: '08.01.2025',
      day: 'Mittwoch',
      menu: '3',
      price: '4',
    },
    {
      number: 3,
      data: '09.01.2025',
      day: 'Donnerstag',
      menu: '4',
      price: '4',
    },
    {
      number: 4,
      data: '10.01.2025',
      day: 'Freitag',
      menu: '5',
      price: '4',
    },
    {
      number: 5,
      data: '13.01.2025',
      day: 'Montag',
      menu: '1',
      price: '4',
    },
    {
      number: 6,
      data: '14.01.2025',
      day: 'Dienstag',
      menu: '2',
      price: '4',
    },
    {
      number: 7,
      data: '15.01.2025',
      day: 'Mittwoch',
      menu: '3',
      price: '4',
    },
    {
      number: 8,
      data: '16.01.2025',
      day: 'Donnerstag',
      menu: '4',
      price: '4',
    },
    {
      number: 9,
      data: '17.01.2025',
      day: 'Freitag',
      menu: '5',
      price: '4',
    },
    {
      number: 10,
      data: '20.01.2025',
      day: 'Montag',
      menu: '1',
      price: '4',
    },
    {
      number: 11,
      data: '21.01.2025',
      day: 'Dienstag',
      menu: '2',
      price: '4',
    },
    {
      number: 12,
      data: '22.01.2025',
      day: 'Mittwoch',
      menu: '3',
      price: '4',
    },
    {
      number: 13,
      data: '23.01.2025',
      day: 'Donnerstag',
      menu: '4',
      price: '4',
    },
    {
      number: 14,
      data: '24.01.2025',
      day: 'Freitag',
      menu: '5',
      price: '4',
    },
    {
      number: 15,
      data: '27.01.2025',
      day: 'Montag',
      menu: '1',
      price: '4',
    },
    {
      number: 16,
      data: '28.01.2025',
      day: 'Dienstag',
      menu: '2',
      price: '4',
    },
    {
      number: 17,
      data: '29.01.2025',
      day: 'Mittwoch',
      menu: '3',
      price: '4',
    },
    {
      number: 18,
      data: '30.01.2025',
      day: 'Donnerstag',
      menu: '4',
      price: '4',
    },
    {
      number: 19,
      data: '31.01.2025',
      day: 'Freitag',
      menu: '5',
      price: '4',
    },
  ];
}
