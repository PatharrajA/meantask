import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers, XHRBackend } from '@angular/http';
import { DataTableModule } from "angular2-datatable";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { ClientComponent } from './component/client/client.component';

import { HttpInterceptor } from './shared/interceptor';
import { ApiService } from './shared/api.service';
import { AuthGuardService } from './shared/authCardService';

import { routing } from './app.router';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ClientComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    DataTableModule,
    routing,
    CommonModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    LoadingBarModule.forRoot()
  ],
  providers: [
    ApiService,
    AuthGuardService,
    {
      provide: HttpInterceptor,
      useClass: HttpInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
