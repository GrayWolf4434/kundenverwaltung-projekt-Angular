import { Routes } from '@angular/router';

// Customers
import { DashboardComponent }          from './customers/dashboard/dashboard.component';
import { NewComponent as CustomersNewComponent }       from './customers/new/new.component';
import { DeleteComponent as CustomersDeleteComponent } from './customers/delete/delete.component';

// Contracts
import { NewComponent as ContractsNewComponent }       from './contracts/new/new.component';
import { ExtendComponent as ContractsExtendComponent } from './contracts/extend/extend.component';

// Inventory
import { NewComponent as InventoryNewComponent }       from './inventory/new/new.component';
import { CheckComponent as InventoryCheckComponent }   from './inventory/check/check.component';

// Receipt
import { NewComponent as ReceiptNewComponent }         from './receipt/new/new.component';
import { SearchComponent as ReceiptSearchComponent }   from './receipt/search/search.component';

// Cash
import { NewComponent as CashNewComponent }            from './cash/new/new.component';
import { ReceiptComponent as CashReceiptComponent }    from './cash/receipt/receipt.component';
import { CloseComponent as CashCloseComponent }        from './cash/close/close.component';

// Others
import { NotificationsComponent } from './notifications/notifications.component';
import { AdminComponent }         from './admin/admin.component';
import { SettingsComponent }      from './settings/settings.component';
import { HelpPageComponent }      from './help/help-page/help-page.component';

export const routes: Routes = [
  // Dashboard (Startseite für Kunden)
  { path: 'customers',           component: DashboardComponent },

  // Kunden-Unterseiten
  { path: 'customers/new',       component: CustomersNewComponent }, 
    { path: 'customers/delete',    component: CustomersDeleteComponent },

  // Contracts
  { path: 'contracts/new',       component: ContractsNewComponent },
  { path: 'contracts/extend',    component: ContractsExtendComponent },

  // Inventory
  { path: 'inventory/new',       component: InventoryNewComponent },
  { path: 'inventory/check',     component: InventoryCheckComponent },

  // Receipt
  { path: 'receipt/new',         component: ReceiptNewComponent },
  { path: 'receipt/search',      component: ReceiptSearchComponent },

  // Cash
  { path: 'cash/new',            component: CashNewComponent },
  { path: 'cash/receipt',        component: CashReceiptComponent },
  { path: 'cash/close',          component: CashCloseComponent },

  // Sonstige
  { path: 'notifications',       component: NotificationsComponent },
  { path: 'admin',               component: AdminComponent },
  { path: 'settings',            component: SettingsComponent },
  { path: 'help',                component: HelpPageComponent },

  // Default auf Kunden‐Dashboard
  { path: '', redirectTo: 'customers', pathMatch: 'full' },
  // Fallback ebenfalls auf Dashboard
  { path: '**', redirectTo: 'customers' }
];
