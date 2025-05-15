import { Component }    from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cash-close',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './close.component.html',
  styleUrls: ['./close.component.css']
})
export class CloseComponent {}
