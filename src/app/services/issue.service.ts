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

  /*
    Set up the OAuth service for password flow
  */
  constructor(private http: HttpClient, private router: Router, private auth: OAuthService) {
    this.auth.useHttpBasicAuth = true;
    auth.tokenEndpoint = 'http://localhost:8080/oauth/token';
    auth.clientId = 'issue_tracker';
    auth.scope = 'READ WRITE';
    auth.dummyClientSecret = 'pin';
    localStorage.clear();
  }

  public getAllIssues() { return this.http.get('http://localhost:8081/api/issues'); }

  public getAllUsers() { return this.http.get('http://localhost:8081/api/users'); }

  public getAllIssuesAssignedToUser(name: string) {

    const params = new HttpParams().set('user', name);
    return this.http.get('http://localhost:8081/api/user', { params });
  }

  ngOnInit() {
  }

  submitNewIssue(issue: Issue) {

    console.log(issue);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.http.post<Issue>('http://localhost:8081/api/issues', issue, httpOptions).subscribe();
  }
  public signinWithOauth(username: string, password: string): boolean {

    this.getAccessToken = null;

    this.auth.fetchTokenUsingPasswordFlow(username, password).then(resp => {
      if (resp['access_token']) {
        this.accessTokenResult = resp;
        localStorage.setItem("username", resp['username']);
        localStorage.setItem("access_token", resp['access_token']);
        localStorage.setItem("refresh_token", resp['refresh_token']);
        this.signedIn = true;
      }
    }).catch(error => {
      return false;
    });

    return this.accessTokenResult == null;
  }

  public getAccessToken(): void {

  }

  public signout(): void {
    this.signedIn = false;
  }

  public isSignedIn(): boolean {
    return this.signedIn;
  }

  public getCurrentUser(): string {
    return localStorage.getItem("username");
  }

}
