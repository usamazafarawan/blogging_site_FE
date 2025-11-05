import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../../models/interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';
import { AdminService } from '../../../core/services/admin.service';


@Component({
  selector: 'app-email-subscriber-list',
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './email-subscriber-list.component.html',
  styleUrl: './email-subscriber-list.component.scss'
})
export class EmailSubscriberListComponent implements OnInit {
subscriber_emails:any[] = [];
loading: boolean = false;

  constructor(private fb: FormBuilder,private adminService: AdminService, private router: Router, private route: ActivatedRoute,private toastr: ToastrService, private authService: AuthService) {
  
  }

   ngOnInit(): void {
    this.getAllSubscriberEmails();
  }

  getAllSubscriberEmails() {
    this.loading = true;
    this.adminService.getSubscribeEmails().subscribe({
      next: (res: any) => {
        this.subscriber_emails = res.data || [];
        console.log('this.subscriber_emails: ', this.subscriber_emails);
        this.loading = false;
      },
      error: () => {
        this.toastr.error('Failed to fetch blogs');
        this.loading = false;
      },
    });
  }


editEmail(item: any) {
  console.log("edit", item);
}

deleteEmail(id: string) {
  console.log("delete", id);
}
 

}
