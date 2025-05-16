import { Component }              from '@angular/core';
import { CommonModule }           from '@angular/common';
import { RouterModule }           from '@angular/router';
import { CustomerFormComponent }  from '../customer-form/customer-form.component';

@Component({
  selector: 'app-customers-new',
  standalone: true,
  imports: [CommonModule, RouterModule, CustomerFormComponent],
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent {}
