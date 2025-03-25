import { Component } from '@angular/core';
import { BgLogoComponent } from '../../ui/bg-logo/bg-logo.component';
import { TitleComponent } from '../../ui/title/title.component';

@Component({
  selector: 'app-contact-page',
  imports: [BgLogoComponent, TitleComponent],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss',
})
export class ContactPageComponent {}
