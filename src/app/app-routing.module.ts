import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { YourAccountComponent } from './your-account/your-account.component';
import { LayoutComponent } from './layout/layout.component';
const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  {
    path: '', component: LayoutComponent,
    children: [
      { path: '', component: DashboardComponent }
    ]
  },
  {
    path: '', component: LayoutComponent,
    children: [
      { path: 'your-account', component: YourAccountComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
