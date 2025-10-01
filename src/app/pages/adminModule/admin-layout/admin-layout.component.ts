import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RequestService } from '../../../core/services/request.service';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet,CommonModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {
    sidebarOpen = false;

      constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private toastr: ToastrService, private requestService: RequestService) {
  }


    logout(){
      this.router.navigate(["/main-page"]);
    }


}
