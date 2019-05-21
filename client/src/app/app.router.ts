import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './shared/authCardService';

import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { ClientComponent } from './component/client/client.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'client', component: ClientComponent, canActivate: [AuthGuardService] }
]

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
