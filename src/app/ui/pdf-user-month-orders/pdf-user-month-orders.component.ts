import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ToastrService } from 'ngx-toastr';
import { Order } from '../../models/order.model';
import { User } from '../../models/user.model';
import { USERS_SEND_INVOICE_URL } from '../../urls';

@Component({
  selector: 'app-pdf-user-month-orders',
  imports: [],
  templateUrl: './pdf-user-month-orders.component.html',
  styleUrl: './pdf-user-month-orders.component.scss',
})
export class PdfUserMonthOrdersComponent {
  @Input() user: User | null = null;
  @Input() orders: Order[] = [];
  @Input() totalPrice: number = 0;
  @Input() currentMonth: number = 1;
  @Input() currentYear: number = 2025;

  constructor(private http: HttpClient, private toastService: ToastrService) {}

  exportToPDF(sendByEmail: boolean = false): void {
    const leftMargin = 25; // left 3 cm
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    if (this.user) {
      doc.setFontSize(16);
      doc.text('Waldorf-menu', leftMargin, 15);
      doc.setFontSize(10);
      doc.text('Max-Suhrbier-Straße 61, 19059, Schwerin', leftMargin, 22);

      doc.text(`Rechnung Nr.: ${this.currentMonth}`, 150, 15);
      doc.text(
        `Datum: 01.${this.currentMonth + 1}.${this.currentYear}`,
        150,
        22
      );

      doc.text(`${this.user.firstName} ${this.user.lastName}`, leftMargin, 35);
      doc.text(
        `${this.user.street || '-'} ${this.user.number || '-'}`,
        leftMargin,
        40
      );
      doc.text(
        `${this.user.postalCode || '-'} ${this.user.city || '-'}`,
        leftMargin,
        45
      );

      doc.text('Kind:', leftMargin, 55);
      doc.text(
        `${this.user.firstNameChild} ${this.user.lastNameChild}`,
        leftMargin,
        60
      );

      if (this.orders.length > 0) {
        autoTable(doc, {
          startY: 70,
          margin: { left: leftMargin },
          head: [['Datum', 'Wochentag', 'Menu', 'Preis']],
          body: this.orders.map((order) => [
            order.date,
            order.dayName,
            order.foodName,
            `${order.foodPrice.toFixed(2)} €`,
          ]),
          theme: 'grid',
          headStyles: { fillColor: [41, 128, 185] },
        });

        // Total price
        const finalY = (doc as any).lastAutoTable.finalY;

        doc.text(
          `Gesamtbetrag ${this.currentMonth}.${
            this.currentYear
          }: ${this.totalPrice.toFixed(2)} €`,
          leftMargin,
          finalY + 10
        );

        doc.text(
          `Die Auszahlung erfolgt bis zum 3 Tag dieses Monats automaticsh,`,
          leftMargin,
          finalY + 20
        );
        doc.text(
          `andereseits überweisen Sie bitte den Betrag auf folgendes Konto:`,
          leftMargin,
          finalY + 25
        );
        doc.text('IBAN: DE00 0000 0000 0000 0000 00', leftMargin, finalY + 35);
        doc.text('BIC: GENODEF1S01', leftMargin, finalY + 40);
      }

      // Save the PDF
      const month = `${this.currentMonth.toString().padStart(2, '0')}.${
        this.currentYear
      }`;
      const userName = `${this.user?.lastName}_${this.user?.firstName}`;
      const fileName = `${month}_Waldorf-menu_${userName}.pdf`;
    }

    // Отправить по email
    const month = `${this.currentMonth.toString().padStart(2, '0')}.${
      this.currentYear
    }`;
    const userName = `${this.user?.lastName}_${this.user?.firstName}`;
    const fileName = `${month}_Waldorf-menu_${userName}.pdf`;

    if (sendByEmail && this.user) {
      // Получаем Blob
      const pdfBlob = doc.output('blob');
      const formData = new FormData();
      formData.append('file', pdfBlob, fileName);
      formData.append('userId', this.user.id.toString());
      formData.append('email', this.user.email || '');
      formData.append('month', this.currentMonth.toString());
      formData.append('year', this.currentYear.toString());
      this.http.post(USERS_SEND_INVOICE_URL, formData).subscribe({
        next: () => this.toastService.success('Email wurde gesendet!'),
        error: () => this.toastService.error('Fehler beim Senden der Email'),
      });
    } else {
      doc.save(fileName);
    }
  }
}
