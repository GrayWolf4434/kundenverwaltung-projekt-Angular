import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  standalone: true,
  imports: [],
  providers: [],
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    // Nach 2 Sekunden zur Login-Seite navigieren
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000);
  }
}
