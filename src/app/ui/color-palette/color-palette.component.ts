import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'app-color-palette',
  imports: [SvgIconComponent],
  templateUrl: './color-palette.component.html',
  styleUrl: './color-palette.component.scss',
})
export class ColorPaletteComponent {
  @Input() currentColorScheme: string[] = [];
  @Output() colorSchemeChanged = new EventEmitter<string[]>();

  colorPalettes: string[][] = [
    ['#16869554', '#23b12344', '#a1ba0246', '#f296013e', '#e751113c'],
    ['#1686956f', '#23b12367', '#a1ba0264', '#f2960161', '#e751115a'],
    ['#23b12321', '#23b12321', '#23b12321', '#23b12321', '#23b12321'],
  ];

  currentPaletteIndex: number = 0;

  toggleColorScheme(): void {
    this.currentPaletteIndex =
      (this.currentPaletteIndex + 1) % this.colorPalettes.length;
    this.currentColorScheme = this.colorPalettes[this.currentPaletteIndex];
    localStorage.setItem(
      'colorScheme',
      JSON.stringify(this.currentColorScheme)
    );
    this.colorSchemeChanged.emit(this.currentColorScheme);
  }
}
