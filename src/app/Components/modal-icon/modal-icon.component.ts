import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { LocalStorageService } from '../../Service/LocalStorage/local-storage.service';
import { v4 as uuidv4 } from 'uuid';
import { Contact } from '../../models';


@Component({
  selector: 'app-modal-icon',
  templateUrl: './modal-icon.component.html',
  styleUrls: ['./modal-icon.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule], 
})
export class ModalIconComponent {
  myForm: FormGroup;
  isNew: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<ModalIconComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Contact,
    private localStorageService: LocalStorageService
  ) {
    console.log('Received data:', this.data);
    if (this.data) this.isNew = false;

    this.myForm = new FormGroup({
      id: new FormControl(this.data?.id ?? null),
      name: new FormControl(this.data?.name ?? null, [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl(this.data?.lastName ?? null, [Validators.required, Validators.minLength(3)]),
      phone: new FormControl(this.data?.phone ?? null, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]), 
      email: new FormControl(this.data?.email ?? null, [Validators.required, Validators.email]),
      dob: new FormControl(this.data?.dob ?? null, Validators.required),
      address: new FormControl(this.data?.address ?? null, Validators.required)
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit(): void {
	if (this.myForm.valid) {
	  this.data = {
		 id: this.myForm.value.id,
		 phone: this.myForm.value.phone,
		 name: this.myForm.value.name,
		 lastName: this.myForm.value.lastName,
		 email: this.myForm.value.email,
		 address: this.myForm.value.address,
		 dob: this.myForm.value.dob,
	  };
	  console.log('Форма відправлена з даними:', this.data);
 
	  if (this.isNew) {
		 this.addContact();
	  } else {
		 this.editContact(); 
	  }
	}
 }

  editContact(): void {
    const contact: Contact = {
      id: this.myForm.value.id,
      name: this.myForm.value.name,
      lastName: this.myForm.value.lastName,
      phone: this.myForm.value.phone,
      email: this.myForm.value.email,
      dob: this.myForm.value.dob,
      address: this.myForm.value.address,
    };
    
    console.log('Editing contact:', contact); 
    this.localStorageService.updateItem(contact);
	 this.dialogRef.close();
  }
  addContact() {
    const newContact = {
      id: uuidv4(), 
      name: this.myForm.value.name,
      lastName: this.myForm.value.lastName,
      phone: this.myForm.value.phone,
      email: this.myForm.value.email,
      dob: this.myForm.value.dob,
      address: this.myForm.value.address
    };
    const currentContacts = this.localStorageService.getItem<Contact[]>('contacts') || [];
    currentContacts.push(newContact);
    this.localStorageService.setItem('contacts', currentContacts);
    console.log('Contact added:', newContact);
    this.dialogRef.close();
  }
}
