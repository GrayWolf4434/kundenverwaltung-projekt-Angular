// src/app/customers/dashboard/dashboard.component.ts
import { Component, OnInit, ViewChild }        from '@angular/core';
import { CommonModule }                         from '@angular/common';
import { RouterModule }                         from '@angular/router';

import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

import { MatToolbarModule }     from '@angular/material/toolbar';
import { MatButtonModule }      from '@angular/material/button';
import { MatIconModule }        from '@angular/material/icon';
import { MatTooltipModule }     from '@angular/material/tooltip';
import { MatFormFieldModule }   from '@angular/material/form-field';
import { MatInputModule }       from '@angular/material/input';
import { MatSelectModule }      from '@angular/material/select';
import { MatDatepickerModule }  from '@angular/material/datepicker';
import { MatNativeDateModule }  from '@angular/material/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule }   from '@angular/material/paginator';
import { MatSort, MatSortModule }             from '@angular/material/sort';
import { MatCardModule }        from '@angular/material/card';

import { HttpClientModule }     from '@angular/common/http';
import { ApiService }           from '../../core/api.service';

// Falls dein ApiService bisher nur Kunde { id,name,email } liefert, erweitere hier auf "any"
interface Customer {
  id: number;
  name: string;
  email?: string;
  // die folgenden Felder gibt's standardmäßig nicht im Backend;
  // wir initialisieren sie später manuell:
  phone?: string;
  vertragsende?: string;
  produkt?: string;
  tarif?: string;
  mitarbeiter?: string;
  info?: string;
}

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,

    // Angular Material
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,

    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,

    MatDatepickerModule,
    MatNativeDateModule,

    MatTableModule,
    MatPaginatorModule,
    MatSortModule,

    MatCardModule,

    // HTTP für ApiService
    HttpClientModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  /** Icon-Buttons unter "Kunde" */
  actions = [
    { label: 'Neue Kunde',           icon: 'person_add',           route: '/customers/new' },
    { label: 'Neu Vertrag',          icon: 'description',          route: '/contracts/new' },
    { label: 'Vertragsverlängerung', icon: 'autorenew',            route: '/contracts/extend' },
    { label: 'Kunde löschen',        icon: 'person_remove',        route: '/customers/delete' }
  ];

  /** Reactive Form für Suche */
  form: FormGroup;

  /** MatTable DataSource & Spalten */
  displayedColumns: string[] = [
    'listNo',
    'vorname',
    'nachname',
    'mobilfunknummer',
    'kundennummer',
    'vertragsende',
    'produkt',
    'tarif',
    'mitarbeiter',
    'info'
  ];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort)      sort!: MatSort;

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.form = this.fb.group({
      criteria: ['vertragsende'],
      term: [''],
      date: [new Date()]
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  /** Lädt die Kunden über das ApiService und mapped auf unsere Spalten */
  private loadData(): void {
    // hier casten wir auf any[], damit TS nicht über "Kunde" stolpert
    this.api.getKunden().subscribe((list: any[]) => {
      const mapped = list.map((k: any, i: number) => ({
        listNo:            i + 1,
        vorname:           (k.name || '').split(' ')[0] || '',
        nachname:          (k.name || '').split(' ')[1] || '',
        mobilfunknummer:   k.phone       || '–',
        kundennummer:      k.id,
        vertragsende:      k.vertragsende || '–',
        produkt:           k.produkt      || '–',
        tarif:             k.tarif        || '–',
        mitarbeiter:       k.mitarbeiter  || '–',
        info:              k.info         || '–'
      }));
      this.dataSource.data = mapped;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onSearch(): void {
    // hier baust du deine Filter-Logik ein
    console.log('Suche mit', this.form.value);
  }

  onClear(): void {
    this.form.setValue({ criteria: 'vertragsende', term: '', date: new Date() });
    this.onSearch();
  }
}
