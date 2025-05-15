import { Component }    from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-inventory-check',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent {}
