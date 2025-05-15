import { Component }    from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contracts-extend',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './extend.component.html',
  styleUrls: ['./extend.component.css']
})
export class ExtendComponent {}
