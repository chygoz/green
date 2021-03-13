import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NetworkComponent } from './network/network.component';
import { NetworktestingComponent } from './networktesting/networktesting.component';
import { YourAccountComponent } from './your-account/your-account.component';
import { HomeComponent } from './home/home.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LayoutComponent } from './layout/layout.component';
import { LayouthomeComponent } from './layouthome/layouthome.component';
import { AuthGuardService as AuthGuard } from './auth-guard.service';
const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {
    path: '', component: LayouthomeComponent,
    children: [
      { path: '', component: HomeComponent }
    ]
  },
  {
    path: 'dashboard', component: LayoutComponent,
    children: [
      { path: '', component: DashboardComponent }
    ]
  },
  {
    path: 'your-account', component: LayoutComponent,
    children: [
      { path: '', component: YourAccountComponent }
    ]
  },
  {
    path: 'network', component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: NetworkComponent }
    ]
  },
  {
    path: 'networktesting', component: LayoutComponent,
    children: [
      { path: '', component: NetworktestingComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
