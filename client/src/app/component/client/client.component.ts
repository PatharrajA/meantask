import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { config } from '../../shared/config';
import { ApiService } from '../../shared/api.service';
import { ToastrService } from 'ngx-toastr';
import { LoadingBarService } from '@ngx-loading-bar/core';
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  public userDetail: any = {};
  public client: any = {
    client_name: '',
    client_email: '',
    organisation: '',
    client_designation: '',
    client_mobile: '',
    state: '',
    city: '',
    country: '',
    linkedIn_profile: '',
    website: '',
    organisation_owner: '',
    owner: ''
  };
  public clients: any[] = [];
  private modalRef;
  private userEdit: boolean = false;
  private userDelete: boolean = false;
  private clientIndex: number = 0;
  private openEditModal: boolean = false;
  constructor(private modalService: NgbModal, private apiService: ApiService, private router: Router, private toastr: ToastrService, private loadingBar: LoadingBarService) {
    this.userDetail = JSON.parse(window.sessionStorage.getItem('userDetail'));
  }

  addClientModal(content) {
    this.modalRef = this.modalService.open(content);
    this.openEditModal = false;
  }

  addClient(formValid) {
    if (formValid.valid) {
      this.loadingBar.start();
      let model = this.client;
      model.organisation_owner = this.userDetail.organisation;
      model.owner = this.userDetail._id;
      if (!this.openEditModal) {
        let url: string = config.urls.client;
        this.apiService.post(url, model).subscribe((res) => {
          this.loadingBar.complete();
          if (res.success) {
            this.getClient();
            this.modalRef.close();
          } else {
            this.toastr.error(res.message);
          }
        }, (error) => { console.log(error, "Error") });
      } else {
        let url: string = config.urls.client + "/" + this.client._id;
        this.apiService.put(url, model).subscribe((res) => {
          this.loadingBar.complete();
          if (res.success) {
            this.getClient();
            this.modalRef.close();
          } else {
            this.toastr.error(res.message);
          }
        }, (error) => { console.log(error, "Error") });
      }
    }
  }

  getClient() {
    let url: string = config.urls.getAllClient + "/" + this.userDetail._id + "/" + this.userDetail.organisation;
    this.apiService.get(url).subscribe((res) => {
      this.loadingBar.complete();
      if (res.success) {
        this.clients = res.client;
      } else {
        this.toastr.error(res.message);
      }
    }, (error) => { console.log(error, "Error") });
  }

  selectClient(index, e) {
    if (e.target.checked) {
      if (this.clients[index].owner === this.userDetail._id)
        this.userEdit = true;
      else
        this.userEdit = false;
      if (this.userDetail.userRole === "Manager") {
        this.userDelete = true;
        this.userEdit = true;
      } else {
        this.userDelete = false;
        this.userEdit = false;
      }
      this.clientIndex = index;
    }
    else {
      this.userEdit = false;
      this.userDelete = false;
    }
  }

  editClient(content) {
    this.modalRef = this.modalService.open(content);
    this.client = this.clients[this.clientIndex];
    this.openEditModal = true;
  }

  deleteClient() {
    this.loadingBar.start();
    let url = config.urls.client + "/" + this.clients[this.clientIndex]._id;
    this.apiService.delete(url).subscribe((res) => {
      this.loadingBar.complete();
      if (res.success) {
        this.userDelete = false;
        this.getClient();
      } else {
        this.toastr.error(res.message);
      }
    }, (error) => { console.log(error, "Error") });
  }

  logout() {
    window.sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.loadingBar.start();
    this.getClient();
  }

}
