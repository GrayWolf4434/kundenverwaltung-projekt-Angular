import { Injectable } from '@angular/core';
import { Kunde } from '../shared/models/kunde.model';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

@Injectable({ providedIn: 'root' })
export class ExportService {

  /** Exportiert die Kundenliste als CSV */
  exportAsCsv(kunden: Kunde[]): void {
    let csv = 'Nr.,Name,E-Mail\n';
    kunden.forEach((k, i) => {
      csv += `${i+1},"${k.name}","${k.email}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = 'kundenliste.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  /** Exportiert die Kundenliste als JSON */
  exportAsJson(kunden: Kunde[]): void {
    const json  = JSON.stringify(kunden, null, 2);
    const blob  = new Blob([json], { type: 'application/json' });
    const url   = URL.createObjectURL(blob);
    const a     = document.createElement('a');
    a.href      = url;
    a.download  = 'kundenliste.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  /** Exportiert die Kundenliste als PDF (AutoTable) */
  exportAsPdf(kunden: Kunde[]): void {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Kundenliste', 20, 20);

    const headers = [['Nr.', 'Name', 'E-Mail']];
    const data    = kunden.map((k, i) => [i+1, k.name, k.email]);

    (doc as any).autoTable({
      head: headers,
      body: data,
      startY: 30,
      styles: { fontSize: 12, cellPadding: 4 },
      headStyles: { fillColor: [22,160,133] }
    });
    doc.save('kundenliste.pdf');
  }
}
