import { Component }    from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.css']  // bleibt so oder leer
})
export class AppComponent {
  title = 'kundenverwaltung-angular';
}
