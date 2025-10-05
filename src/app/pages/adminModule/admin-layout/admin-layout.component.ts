import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RequestService } from '../../../core/services/request.service';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet,CommonModule,RouterModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent implements OnInit {
    sidebarOpen = false;
    userName: string | null = '';


      constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private toastr: ToastrService, private requestService: RequestService) {
  }

  
ngOnInit() {
  this.userName = localStorage.getItem('name');
}



    logout(){
      this.toastr.success('Logged out Successfully');
      localStorage.clear();
      this.router.navigate(["/main-page"]);
    }


}
