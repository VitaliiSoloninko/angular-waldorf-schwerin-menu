import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-bg-logo',
  imports: [],
  templateUrl: './bg-logo.component.html',
  styleUrl: './bg-logo.component.scss',
})
export class BgLogoComponent {
  @Input() logoName: string = '';

  logoPath: string = '';

  private logoMap: { [key: string]: string } = {
    green: '/assets/bg-logos/bg-logo-green.svg',
    blue: '/assets/bg-logos/bg-logo-blue.svg',
    red: '/assets/bg-logos/bg-logo-red.svg',
    yellow: '/assets/bg-logos/bg-logo-yellow.svg',
    orange: '/assets/bg-logos/bg-logo-orange.svg',
    light: '/assets/bg-logos/bg-logo-light.svg',
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['logoName']) {
      this.logoPath = this.logoMap[this.logoName.toLowerCase()] || '';
    }
  }
}
