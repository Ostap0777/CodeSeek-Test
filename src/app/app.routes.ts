import { Routes } from '@angular/router';
import { ListContactsComponent } from './Page/list-contacts/list-contacts.component';
import { ContactIdComponent } from './Page/contact-id/contact-id.component';

export const routes: Routes = [
  { path: '', component: ListContactsComponent },
  { path: 'contact/:id', component: ContactIdComponent },
  { path: '**', redirectTo: '' } // Маршрут для невідомих URL
];
