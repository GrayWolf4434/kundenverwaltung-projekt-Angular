import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  // Formular-Gruppe hier nur deklariert
  forgotForm!: FormGroup;
  message = '';

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    // Formular-Gruppe im Konstruktor initialisieren
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.forgotForm.invalid) {
      return;
    }
    const email = this.forgotForm.value.email;
    this.message = `Einen Link zum Zurücksetzen des Passworts haben wir an ${email} geschickt.`;
    // Nach kurzer Verzögerung zurück zum Login leiten
    setTimeout(() => this.router.navigate(['/login']), 3000);
  }
}
