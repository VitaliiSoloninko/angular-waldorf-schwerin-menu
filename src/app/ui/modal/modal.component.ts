import { TitleCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-modal',
  imports: [NotificationComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() title: string;

  constructor(public modalService: ModalService) {}
}
