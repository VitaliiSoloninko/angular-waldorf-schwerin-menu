import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { LucideAngularModule, Trash2 } from 'lucide-angular';

@Component({
  selector: 'app-cart-page',
  imports: [NgFor, LucideAngularModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
})
export class CartPageComponent {
  trash2: any = Trash2;

  foodItems = [
    {
      data: '13.01.2025',
      day: 'Montag',
      name: 'Menu 1',
      price: 4,
      description: `Kochei in Senfsauce, Salzkartoffeln, Rotkrautsalat, Dessert`,
      image: 'vegen.svg',
    },
    {
      data: '14.01.2025',
      day: 'Dienstag',
      name: 'Menu 2',
      price: 4,
      description: `Mildes Karotten-Bohnen-Curry mit Sonnenblumenkernen, Vollkorn-Nudeln, Eisberg-Birnen-Salat, Obst`,
      image: 'vegen.svg',
    },
    {
      data: '15.01.2025',
      day: 'Mittwoch',
      name: 'Menu 3',
      price: 4,
      description: `Linseneintopf mit feinem Lauch, Möhren und Kartoffeln, Brötchen`,
      image: 'vegen.svg',
    },
    {
      data: '16.01.2025',
      day: 'Donnerstag',
      name: 'Menu 4',
      price: 4,
      description: `Mildes Karotten-Bohnen-Curry mit Sonnenblumenkernen, Vollkorn-Nudeln, Eisberg-Birnen-Salat, Obst`,
      image: 'vegen.svg',
    },
    {
      data: '17.01.2025',
      day: 'Freitag',
      name: 'Menu 5',
      price: 4,
      description: `Linseneintopf mit feinem Lauch, Möhren und Kartoffeln, Brötchen`,
      image: 'vegen.svg',
    },
  ];
}
