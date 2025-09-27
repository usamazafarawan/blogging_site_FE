import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RequestService } from '../../core/services/request.service';
import { MainRequestServiceService } from '../../core/services/main-request-service.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-contact-detail-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.scss',
  providers: [MainRequestServiceService, RequestService]
})
export class ContactDetailComponent implements OnInit {
 contactDetail: any;

  @Input() set selectedContactId(id: number) {
    if (id > 0) {
      this.requestService.getContactsDetailById(id).subscribe({
        next: (res:any) => {
          this.contactDetail = res;
        },
        error: (err) => {
          console.error('Error fetching contact Detail:', err);
          this.toastr.error('Failed to load contact detail');
        }
      });

    }
  }

 
  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private toastr: ToastrService, private requestService: RequestService) {

  }

  ngOnInit(): void {
  }

}
