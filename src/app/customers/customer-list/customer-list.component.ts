import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule }       from '@angular/forms';
import { RouterModule }      from '@angular/router';
import { ApiService }        from '../../core/api.service';
import { ExportService }     from '../../core/export.service';
import { ImportService }     from '../../core/import.service';
import { Kunde }             from '../../shared/models/kunde.model';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  kunden: Kunde[] = [];
  filter = '';

  constructor(
    private api: ApiService,
    private exp: ExportService,
    private imp: ImportService
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.api.getKunden().subscribe(list => this.kunden = list);
  }

  delete(id: number): void {
    if (!confirm('Diesen Kunden wirklich löschen?')) return;
    this.api.deleteKunde(id).subscribe(() => this.load());
  }

  get filtered(): Kunde[] {
    const term = this.filter.toLowerCase();
    return this.kunden.filter(k =>
      k.name.toLowerCase().includes(term) ||
      k.email.toLowerCase().includes(term)
    );
  }

  onExportCsv(): void  { this.exp.exportAsCsv(this.kunden); }
  onExportJson(): void { this.exp.exportAsJson(this.kunden); }
  onExportPdf(): void  { this.exp.exportAsPdf(this.kunden); }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (!file) return;
    const handler = file.name.toLowerCase().endsWith('.json')
      ? this.imp.readJson(file)
      : this.imp.readCsv(file);
    handler
      .then(arr => {
        if (!confirm('Importieren und existierende Daten behalten?')) return;
        arr.forEach(k =>
          this.api.addKunde({ name: k.name, email: k.email }).subscribe()
        );
        setTimeout(() => this.load(), 500);
      })
      .catch(() => alert('Fehler beim Einlesen der Datei.'));
    event.target.value = '';
  }
}
