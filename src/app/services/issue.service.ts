import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Issue } from '../model/issue';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { map } from 'rxjs/operators';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({ providedIn: 'root' })
export class IssueService implements OnInit {

  private signedIn = false;
  private accessTokenResult;
  private currentUser: string;
  private loadingSignIn = false;

  /*
    Set up the OAuth service for password flow
  */
  constructor(private http: HttpClient, private router: Router, private auth: OAuthService) {
    localStorage.clear();
    this.auth.useHttpBasicAuth = true;
    auth.tokenEndpoint = 'http://localhost:8080/oauth/token';
    auth.clientId = 'issue_tracker';
    auth.scope = 'READ WRITE';
    auth.dummyClientSecret = 'pin';
  }

  public getAllIssues() {
    const params = new HttpParams().set('access_token', localStorage.getItem('access_token'));
    return this.http.get('http://localhost:8081/api/issues', { params });
  }

  public getAllUsers() {
    const params = new HttpParams().set('access_token', localStorage.getItem('access_token'));
    return this.http.get('http://localhost:8081/api/users', { params });
  }

  public getAllIssuesAssignedToUser(name: string) {

    const params = new HttpParams()
      .set('user', localStorage.getItem('fullName'))
      .set('access_token', localStorage.getItem('access_token'));

    return this.http.get('http://localhost:8081/api/user', { params });
  }

  ngOnInit() {
    if (localStorage.getItem("access_token")) {

    }
  }

  public submitNewIssue(issue: Issue): void {

    console.log(issue);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.http.post<Issue>('http://localhost:8081/api/issues', issue, httpOptions).subscribe();
  }

  public signinWithOauth(username: string, password: string): void {

    this.loadingSignIn = true;
    this.auth.fetchTokenUsingPasswordFlow(username, password).then(resp => {
      if (resp['access_token']) {
        console.log(resp);
        localStorage.setItem("username", resp['username']);
        localStorage.setItem("access_token", resp['access_token']);
        localStorage.setItem("refresh_token", resp['refresh_token']);
        this.getUserLoggedInDetails();
      }
    }).catch(error => {

    });

  }

  public getAccessToken(): void {

  }

  private getUserLoggedInDetails(): void {
    const params = new HttpParams()
      .set('username', localStorage.getItem('username'))
      .set('access_token', localStorage.getItem('access_token'));

    var fullName: string;

    this.http.get('http://localhost:8081/api/user', { params }).subscribe(data => {
      this.currentUser = data['name'] + '';
      localStorage.setItem('fullName', this.currentUser);
      this.loadingSignIn = false;
      this.signedIn = true;
    });
  }

  public signout(): void {
    this.signedIn = false;
    localStorage.clear();
  }

  public isSignedIn(): boolean {
    return this.signedIn;
  }

  public getCurrentUserFullName(): string {
    return localStorage.getItem("fullName");
  }

  public isLoadingSignin(): boolean {
    return this.loadingSignIn;
  }

  public getIssueBasedOnId(id: string): any {
    const params = new HttpParams()
      .set('id', id)
      .set('access_token', localStorage.getItem('access_token'));

    return this.http.get('http://localhost:8081/api/issue', { params });
  }

}
