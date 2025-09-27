import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RequestService } from '../../core/services/request.service';
import { MainRequestServiceService } from '../../core/services/main-request-service.service';
import { HttpClientModule } from '@angular/common/http';
import { ContactDetailComponent } from '../contact-detail/contact-detail.component';

@Component({
  selector: 'app-contacts-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, ContactDetailComponent],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss',
  providers: [MainRequestServiceService, RequestService]
})
export class ContactPageComponent {
  contactList: any[] = [];
  selectedId: number = -1;
  selectedIndex: number = -1;
  searchText = '';
  filteredContacts:any[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private toastr: ToastrService, private requestService: RequestService) {
    this.getContactsList();
  }


  getContactsList() {
    this.requestService.getContactsList().subscribe({
      next: (res) => {
        this.contactList = res;
          this.filteredContacts = [...this.contactList];

      },
      error: (err) => {
        console.error('Error fetching contacts:', err);
        this.toastr.error('Failed to load contacts');
      }
    });
  }


  selectedContactId(id: any,index:number) {
      this.selectedId = id;
      this.selectedIndex = index;        
  }

   filterContacts() {
    const text = this.searchText.trim().toLowerCase();
    if (text === '') {
      this.filteredContacts = [...this.contactList];
    } else {
      this.filteredContacts = this.contactList.filter(contact =>
        contact.name.toLowerCase().includes(text)
      );
    }
  }
}
