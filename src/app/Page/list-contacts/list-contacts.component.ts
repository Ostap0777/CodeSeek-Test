import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { ModalIconComponent } from '../../Components/modal-icon/modal-icon.component';
import { LocalStorageService } from '../../Service/LocalStorage/local-storage.service';
import { Contact } from '../../models';
@Component({
  selector: 'app-list-contacts',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterModule],
  templateUrl: './list-contacts.component.html',
  styleUrls: ['./list-contacts.component.scss'],
})
export class ListContactsComponent implements OnInit {
  constructor(
    public dialog: MatDialog, 
    private localStorageService: LocalStorageService
  ) {}
  searchQuery: string = '';

  selectedContact: Contact | null = null;
  isModalOpen: boolean = false;
  isNew :boolean = false;
  contacts: Contact[] = [];

  ngOnInit(): void {
    this.loadContacts(); 
  }

  loadContacts(): void {
    const storedContacts = this.localStorageService.getItem<Contact[]>('contacts');
	 console.log(storedContacts)
    if (storedContacts) {
      this.contacts = storedContacts; 
    }
  }


  saveContacts(): void {
    this.localStorageService.setItem('contacts', this.contacts);
  }

  get filteredContacts(): Contact[] {
    return this.contacts.filter((contact) =>
      contact.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  openDialog(contact?: Contact): void {
	const dialogConfig = new MatDialogConfig();
	dialogConfig.disableClose = true;
	dialogConfig.data = contact || null;
	const dialogRef = this.dialog.open(ModalIconComponent, dialogConfig);
 }

  openAddContactModal() {
    this.isModalOpen = true;
  }


  deleteContact(contact: Contact): void {
    if (confirm(`Are you sure you want to delete ${contact.name}?`)) {
      this.contacts = this.contacts.filter(c => c.id !== contact.id);
      this.selectedContact = null;
      this.saveContacts(); 
    }
  }


}
