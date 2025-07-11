import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-button',
  imports: [],
  templateUrl: './icon-button.component.html',
  styleUrl: './icon-button.component.scss',
})
export class IconButtonComponent {
  @Input() icon: string = 'plus';
  @Input() active: boolean = false;

  get iconName(): string {
    return `assets/svg/${this.icon}.svg`;
  }
}
