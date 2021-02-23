import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NetworkComponent } from './network/network.component';
import { YourAccountComponent } from './your-account/your-account.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { LayouthomeComponent } from './layouthome/layouthome.component';
const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: '', component: LayouthomeComponent,
    children: [
      { path: '', component: HomeComponent }
    ]
  },
  {
    path: '', component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent }
    ]
  },
  {
    path: '', component: LayoutComponent,
    children: [
      { path: 'your-account', component: YourAccountComponent }
    ]
  },
  {
    path: '', component: LayoutComponent,
    children: [
      { path: 'network', component: NetworkComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
