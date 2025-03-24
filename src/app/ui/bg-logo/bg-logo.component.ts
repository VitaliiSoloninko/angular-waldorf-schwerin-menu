import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bg-logo',
  imports: [],
  templateUrl: './bg-logo.component.html',
  styleUrl: './bg-logo.component.scss',
})
export class BgLogoComponent {
  @Input() logoGreen: string = '/assets/bg-logos/bg-logo-green.svg';
  @Input() logoBlue: string = '/assets/bg-logos/bg-logo-blue.svg';
}
