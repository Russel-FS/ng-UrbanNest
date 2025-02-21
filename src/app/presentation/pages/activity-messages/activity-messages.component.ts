import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ContactsComponent } from "./contacts/contacts.component";
import { FavoritesComponent } from "./favorites/favorites.component";
import { HistoryComponent } from "./history/history.component";
import { DiscardedComponent } from "./discarded/discarded.component";
import { SearchesComponent } from "./searches/searches.component";
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-activity-messages',
  templateUrl: './activity-messages.component.html',
  styleUrls: ['./activity-messages.component.scss'],
  imports: [CommonModule, ContactsComponent, FavoritesComponent, HistoryComponent, DiscardedComponent, SearchesComponent],
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ]
})
export class ActivityMessagesComponent {
  activeSection: string = 'contacts';
  
  sections = [
    { id: 'contacts', name: 'Mis contactos', icon: 'fa-users', count: 24 },
    { id: 'favorites', name: 'Favoritos', icon: 'fa-star', count: 5 },
    { id: 'history', name: 'Historial', icon: 'fa-history', count: 12 },
    { id: 'discarded', name: 'Descartados', icon: 'fa-ban', count: 3 },
    { id: 'searches', name: 'Búsquedas y alertas', icon: 'fa-search', count: 8 }
  ];

  setActiveSection(section: string) {
    this.activeSection = section;
  }
}
