import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UpgradeCardComponent } from './upgrade-card/upgrade-card.component';
import { RegisterComponent } from './register/register.component';
import { YourAccountComponent } from './your-account/your-account.component';
import { NetworkComponent } from './network/network.component';
import { LoginComponent } from './login/login.component';
import { LayouthomeComponent } from './layouthome/layouthome.component';
import { LandingHeaderComponent } from './landing-header/landing-header.component';
import { LandingFooterComponent } from './landing-footer/landing-footer.component';
import { HomeComponent } from './home/home.component';
import { NetworktestingComponent } from './networktesting/networktesting.component';
import { AuthGuardService } from './auth-guard.service';
import { WithdrawRequestComponent } from './withdraw-request/withdraw-request.component';
import { ShareReferralComponent } from './share-referral/share-referral.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

//import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
//import { ShareIconsModule } from 'ngx-sharebuttons/icons';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    UpgradeCardComponent,
    RegisterComponent,
    YourAccountComponent,
    NetworkComponent,
    LoginComponent,
    LayouthomeComponent,
    LandingHeaderComponent,
    LandingFooterComponent,
    HomeComponent,
    NetworktestingComponent,
    WithdrawRequestComponent,
    ShareReferralComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatMenuModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatExpansionModule,
    HttpClientModule,
    CarouselModule,
    // ShareButtonsModule,
    // ShareIconsModule

  ],
  exports: [MatDialogModule, MatButtonModule],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
