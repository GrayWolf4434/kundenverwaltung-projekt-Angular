import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule }                  from '@angular/common';
import { RouterModule }                  from '@angular/router';

// Reactive Forms
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

// Angular Material Modules
import { MatToolbarModule }    from '@angular/material/toolbar';
import { MatButtonModule }     from '@angular/material/button';
import { MatIconModule }       from '@angular/material/icon';
import { MatTooltipModule }    from '@angular/material/tooltip';
import { MatFormFieldModule }  from '@angular/material/form-field';
import { MatInputModule }      from '@angular/material/input';
import { MatSelectModule }     from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator }   from '@angular/material/paginator';
import { MatSortModule, MatSort }             from '@angular/material/sort';
import { MatCardModule }       from '@angular/material/card';

import { ApiService } from '../../core/api.service';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,

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

    MatCardModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  /** Icon-Buttons unter "Kunde" */
  actions = [
    { label: 'Neue Kunde',          icon: 'person_add',           route: '/customers/new' },
    { label: 'Neu Vertrag',         icon: 'description',          route: '/contracts/new' },
    { label: 'Vertragsverlängerung',icon: 'autorenew',            route: '/contracts/extend' },
    { label: 'Kunde löschen',       icon: 'person_remove',        route: '/customers/delete' }
  ];

  /** Reactive Form */
  form: FormGroup;

  /** Tabelle */
  displayedColumns: string[] = [
    'listNo','vorname','nachname','mobilfunknummer',
    'kundennummer','vertragsende','produkt','tarif',
    'mitarbeiter','info'
  ];
  dataSource = new MatTableDataSource<any>();

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

  private loadData(): void {
    this.api.getKunden().subscribe(list => {
      const mapped = list.map((k, i) => ({
        listNo: i + 1,
        vorname: k.name.split(' ')[0] || '',
        nachname: k.name.split(' ')[1] || '',
        mobilfunknummer: '—',
        kundennummer: k.id,
        vertragsende: '—',
        produkt: '—',
        tarif: '—',
        mitarbeiter: '—',
        info: '—'
      }));
      this.dataSource.data = mapped;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onSearch(): void {
    // hier später Filterlogik anpassen
    console.log('Suche mit', this.form.value);
  }

  onClear(): void {
    this.form.setValue({ criteria: 'vertragsende', term: '', date: new Date() });
    this.onSearch();
  }
}
