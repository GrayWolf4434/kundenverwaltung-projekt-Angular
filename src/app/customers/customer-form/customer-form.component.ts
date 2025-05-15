import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ApiService }        from '../../core/api.service';
import { Kunde }             from '../../shared/models/kunde.model';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
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
      name:  ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.api.getKunden().subscribe(list => {
        const k = list.find(x => x.id === this.id);
        if (k) this.form.patchValue({ name: k.name, email: k.email });
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    const value = this.form.value;
    if (this.id) {
      this.api.updateKunde({ id: this.id, ...value }).subscribe(() => {
        this.router.navigate(['/customers']);
      });
    } else {
      this.api.addKunde(value).subscribe(() => {
        this.router.navigate(['/customers']);
      });
    }
  }
}
