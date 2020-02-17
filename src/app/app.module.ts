import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app-component/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {
  MatSidenavModule, MatSelectModule, MatToolbarModule, MatTableModule,
  MatButtonModule, MatCardModule, MatInputModule, MatOptionModule, MatAutocompleteModule,
  MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatIconModule,
  MatProgressBarModule, MatButtonToggleModule, MatProgressSpinnerModule, MatRippleModule, MatSnackBarModule
} from '@angular/material/';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LeftSideNavComponent } from './components/left-side-nav/left-side-nav.component';
import { RightSideNavComponent } from './components/right-side-nav/right-side-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AllIssuesComponent } from './components/all-issues/all-issues.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { IssueDetailsComponent } from './components/issue-details/issue-details.component';
import { OAuthModule } from 'angular-oauth2-oidc';
import { SignInComponent } from './components/sign-in/sign-in.component';

const appRoutes = [
  { path: 'dashboard', component: UserDashboardComponent },
  { path: 'issues', component: AllIssuesComponent },
  { path: 'issues/:id', component: IssueDetailsComponent },
  { path: 'signin', component: SignInComponent }
]
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LeftSideNavComponent,
    RightSideNavComponent,
    UserDashboardComponent,
    AllIssuesComponent,
    IssueDetailsComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule, MatSliderModule, MatSidenavModule, MatSelectModule, BrowserAnimationsModule, MatToolbarModule,
    MatTableModule, HttpClientModule, RouterModule.forRoot(appRoutes), ReactiveFormsModule, FormsModule,
    MatCardModule, MatButtonModule, MatInputModule, MatOptionModule, MatAutocompleteModule, MatCheckboxModule, MatDatepickerModule,
    MatNativeDateModule, NgbModule, MatIconModule, LayoutModule, MatListModule, MatGridListModule, MatMenuModule,
    MatPaginatorModule, MatSortModule, MatProgressBarModule, MatButtonToggleModule, MatProgressSpinnerModule, MatRippleModule,
    OAuthModule.forRoot(), MatSnackBarModule
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor() { }
}