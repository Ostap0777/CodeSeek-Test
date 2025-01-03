import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LocalStorageService } from '../../Service/LocalStorage/local-storage.service';
import { Contact } from '../../models';


@Component({
  selector: 'app-contact-id',
  imports: [RouterModule],
  templateUrl: './contact-id.component.html',
  styleUrls: ['./contact-id.component.scss']
})
export class ContactIdComponent implements OnInit {
  contact: Contact | null = null; 

  constructor(
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    const contactId = this.route.snapshot.paramMap.get('id');
    if (contactId) {
      this.fetchContact(contactId);
    }
  }

  fetchContact(id: string): void {

    const contacts = this.localStorageService.getItem<Contact[]>('contacts');

    if (contacts) {
      const foundContact = contacts.find(contact => contact.id === id);
      if (foundContact) {
        this.contact = foundContact;
      } else {
        console.log(`Contact with id ${id} not found`);
      }
    }
  }
 
}
