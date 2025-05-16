import { Component }               from '@angular/core';
import { CommonModule }            from '@angular/common';
import { RouterModule }            from '@angular/router';
import { CustomerListComponent }   from '../customer-list/customer-list.component';

@Component({
  selector: 'app-customers-delete',
  standalone: true,
  imports: [CommonModule, RouterModule, CustomerListComponent],
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {}
