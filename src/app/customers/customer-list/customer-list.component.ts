import { Component, OnInit } from '@angular/core';
import { ApiService }      from '../../core/api.service';
import { ExportService }   from '../../core/export.service';
import { ImportService }   from '../../core/import.service';
import { Kunde }           from '../../shared/models/kunde.model';
import { AuthService }     from '../../core/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  kunden: Kunde[] = [];
  filter = '';

  constructor(
    private api: ApiService,
    private exp: ExportService,
    private imp: ImportService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.api.getKunden().subscribe(list => this.kunden = list);
  }

  /** Löschen */
  delete(id: number) {
    if (!confirm('Kunden wirklich löschen?')) return;
    this.api.deleteKunde(id).subscribe(() => this.load());
  }

  /** Filter-Liste */
  get filtered() {
    const term = this.filter.toLowerCase();
    return this.kunden.filter(k =>
      k.name.toLowerCase().includes(term) ||
      k.email.toLowerCase().includes(term)
    );
  }

  /** Export-Buttons */
  onExportCsv()  { this.exp.exportAsCsv(this.kunden); }
  onExportJson() { this.exp.exportAsJson(this.kunden); }
  onExportPdf()  { this.exp.exportAsPdf(this.kunden); }

  /** Import-Button */
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (!file) return;
    const handler = file.name.toLowerCase().endsWith('.json')
      ? this.imp.readJson(file)
      : this.imp.readCsv(file);
    handler
      .then(arr => {
        if (!confirm('Importieren und existierende Daten behalten?')) return;
        // jeden Kunden anlegen
        arr.forEach(k =>
          this.api.addKunde({ name: k.name, email: k.email })
            .subscribe(() => {}, () => {})
        );
        setTimeout(() => this.load(), 500);
      })
      .catch(() => alert('Fehler beim Einlesen der Datei.'));
    // Reset Input
    event.target.value = '';
  }
}
