import { Component, Input } from '@angular/core';

@Component({
  selector: 'svg[icon]',
  imports: [],
  template: '<svg:use [attr.href]="href"></svg:use>',
  styles: [''],
})
export class SvgIconComponent {
  @Input() icon = '';

  get href() {
    return `/assets/svg/${this.icon}.svg#${this.icon}`;
  }
}

// HTML
// <div class="svg-block">
//     <svg icon="cart"></svg>
//   </div>

// CSS
// .svg-block {
//   width: 24px;
//   height: 24px;
//   color: grey;
//   transition: color 0.3s ease 0s;
// }

// .svg-block {
//   &:hover,
//   &:focus-visible {
//     color: green;
//   }
// }
