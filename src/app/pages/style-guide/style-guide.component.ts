import { Component } from '@angular/core';
import { IconButtonComponent } from '../../ui/icon-button/icon-button.component';
import { TitleComponent } from '../../ui/title/title.component';

@Component({
  selector: 'app-style-guide',
  imports: [IconButtonComponent, TitleComponent],
  templateUrl: './style-guide.component.html',
  styleUrl: './style-guide.component.scss',
})
export class StyleGuideComponent {}
