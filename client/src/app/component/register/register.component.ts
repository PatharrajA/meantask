import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { config } from '../../shared/config';
import { ApiService } from '../../shared/api.service';
import { ToastrService } from 'ngx-toastr';
import { LoadingBarService } from '@ngx-loading-bar/core';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public user: any = {
    email: '',
    name: '',
    organisation: '',
    userRole: 'User',
    password: '',
    mobile: ''
  }
  constructor(private apiService: ApiService, private route: Router, private toastr: ToastrService, private loadingBar: LoadingBarService) { }

  register(formValid) {
    if (formValid.valid) {
      this.loadingBar.start();
      let url: string = config.endpoint + config.urls.register;
      this.apiService.noAuthPost(url, this.user).subscribe((res) => {
        this.loadingBar.complete();
        if (res.success) {
          window.sessionStorage.userDetail = JSON.stringify(res.user);
          window.sessionStorage.token = res.token;
          document.cookie = "email=" + this.user.email;
          document.cookie = "password=" + this.user.password;
          this.route.navigate(['/client']);
        } else {
          this.toastr.error(res.message);
        }
      }, (error) => { console.log(error, "Error") });
    }
  }
  ngOnInit() {
  }

}
