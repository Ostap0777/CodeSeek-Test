import { Injectable } from '@angular/core';
import { contacts } from '../../dataLocalStorage';
import { Contact } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() {
    if (!localStorage.getItem('contacts')) {
      this.setItem<Contact[]>('contacts', contacts);
    }
  }

  setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error setting item in localStorage', error);
    }
  }

  getItem<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) as T : null;
    } catch (error) {
      console.error('Error getting item from localStorage', error);
      return null;
    }
  }

  updateItem(updatedContact: Contact): void {
    const currentContacts: Contact[] = this.getItem<Contact[]>('contacts') || [];
    const contactIndex = currentContacts.findIndex(contact => contact.id === updatedContact.id);

    if (contactIndex !== -1) {
      currentContacts[contactIndex] = { ...currentContacts[contactIndex], ...updatedContact };
      this.setItem('contacts', currentContacts);
    } else {
      console.error('Contact not found to update');
    }
  }

  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing item from localStorage', error);
    }
  }

  addUser(newUser: Contact): void {
    const currentContacts: Contact[] = this.getItem<Contact[]>('contacts') || [];
    currentContacts.push(newUser);
    this.setItem('contacts', currentContacts);
  }
}
