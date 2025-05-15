import { Component }    from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cash-new',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent {}
