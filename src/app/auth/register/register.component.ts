import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  regForm: FormGroup;
  error = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.regForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirm: ['', Validators.required]
    }, { validators: this.passwordsMatch });
  }

  private passwordsMatch(fg: FormGroup) {
    const p = fg.get('password')!.value;
    const c = fg.get('confirm')!.value;
    return p === c ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.regForm.invalid) return;
    const { username, password } = this.regForm.value;
    this.auth.register(username, password).subscribe({
      next: () => this.router.navigate(['/login']),
      error: err => this.error = err.error?.fehler || 'Registrierung fehlgeschlagen'
    });
  }
}
