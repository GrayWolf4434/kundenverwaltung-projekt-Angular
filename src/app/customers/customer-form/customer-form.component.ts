import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../../core/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Kunde } from '../../shared/models/kunde.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-form',
  standalone: true, // <-- WICHTIG: Hier hinzufügen
  imports: [CommonModule, FormsModule, ReactiveFormsModule], // <-- Alle Module in einer Liste
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {
  form!: FormGroup;
  id?: number;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [''],
      email: ['']
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.api.getKunden().subscribe(list => {
        const k = list.find(x => x.id === this.id);
        if (k) this.form.setValue({ name: k.name, email: k.email });
      });
    }
  }

  onSubmit() {
    const val = this.form.value;
    if (this.id) {
      this.api.updateKunde({ id: this.id, ...val }).subscribe(() => {
        this.router.navigate(['/customers']);
      });
    } else {
      this.api.addKunde(val).subscribe(() => {
        this.router.navigate(['/customers']);
      });
    }
  }
}