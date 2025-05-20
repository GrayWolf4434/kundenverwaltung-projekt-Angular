// src/app/app.component.ts
import { Component } from '@angular/core';

// Angular-Module & Direktiven
import { CommonModule }           from '@angular/common';
import { RouterModule }           from '@angular/router';
import { RouterOutlet }           from '@angular/router';

// Angular Material
import { MatToolbarModule }       from '@angular/material/toolbar';
import { MatMenuModule }          from '@angular/material/menu';
import { MatButtonModule }        from '@angular/material/button';
import { MatIconModule }          from '@angular/material/icon';

interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  children?: MenuItem[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    // Direktiven fürs Template
    CommonModule,
    RouterModule,
    RouterOutlet,

    // Material-Komponenten
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  menu: MenuItem[] = [
    {
      label: 'Kunde', icon: 'person',
      children: [
        { label: 'Neue Kunde',           icon: 'person_add',           route: '/customers/new' },
        { label: 'Neu Vertrag',          icon: 'description',          route: '/contracts/new' },
        { label: 'Vertragsverlängerung', icon: 'autorenew',            route: '/contracts/extend' },
        { label: 'Kunde löschen',        icon: 'person_remove',        route: '/customers/delete' }
      ]
    },
    {
      label: 'Inventar', icon: 'inventory',
      children: [
        { label: 'Bestand einfügen',      icon: 'add_box',        route: '/inventory/new' },
        { label: 'Bestand kontrollieren', icon: 'search',         route: '/inventory/check' }
      ]
    },
    {
      label: 'Beleg', icon: 'receipt',
      children: [
        { label: 'Neu Beleg anlegen', icon: 'post_add', route: '/receipt/new' },
        { label: 'Beleg suchen',      icon: 'search',   route: '/receipt/search' }
      ]
    },
    {
      label: 'Kasse', icon: 'shopping_cart',
      children: [
        { label: 'Neueintrag',     icon: 'add_shopping_cart',      route: '/cash/new' },
        { label: 'Quittung',       icon: 'receipt_long',           route: '/cash/receipt' },
        { label: 'Kassenabschluss',icon: 'account_balance_wallet', route: '/cash/close' }
      ]
    },
    { label: 'Benachrichtigung', icon: 'notifications',      route: '/notifications' },
    { label: 'Administrator',    icon: 'admin_panel_settings', route: '/admin' },
    { label: 'Einstellungen',    icon: 'settings',             route: '/settings' },
    { label: 'Hilfe',            icon: 'help_outline',         route: '/help' }
  ];
}
