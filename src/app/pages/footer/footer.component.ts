import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RequestService } from '../../core/services/request.service';
import { MainRequestServiceService } from '../../core/services/main-request-service.service';
import { HttpClientModule } from '@angular/common/http';
import { AdminService } from '../../core/services/admin.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  providers: [MainRequestServiceService, RequestService]
})
export class FooterComponent {

  newsletterForm!: FormGroup;
  loading = false;
  success = false;

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private toastr: ToastrService, private requestService: RequestService,
    private adminService: AdminService
  ) {
  }

    ngOnInit() {
    this.newsletterForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

 subscribe() {
    if (this.newsletterForm.invalid) return;

    this.loading = true;
    this.adminService.subscribeEmail({email:this.newsletterForm.value.email})
      .subscribe({
        next: (res) => {
          this.success = true;
          this.toastr.success('Subscription successful!');
          this.newsletterForm.reset();
          this.loading = false;
        },
        error: () => {
          this.success = false;
          this.toastr.error('Something went wrong. Try again.');
          this.loading = false;
        }
      });
  }


}
