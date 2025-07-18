import { Component, Input } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'app-modal',
  imports: [SvgIconComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() title: string;

  constructor(public modalService: ModalService) {}
}
