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

  /*
    Set up the OAuth service for password flow
  */
  constructor(private http: HttpClient, private router: Router, private auth: OAuthService) {
    auth.tokenEndpoint = 'http://localhost:8080/oauth/token';
    auth.clientId = 'issue_tracker';
    auth.scope = 'READ WRITE';
    auth.dummyClientSecret = 'pin';
    this.auth.useHttpBasicAuth = true;

  }

  public getAllIssues() { return this.http.get('http://localhost:8080/api/issues'); }

  public getAllUsers() { return this.http.get('http://localhost:8080/api/users'); }

  public getAllIssuesAssignedToUser(name: string) {

    const params = new HttpParams().set('user', name);
    return this.http.get('http://localhost:8080/api/user', { params });
  }

  ngOnInit() { }

  submitNewIssue(issue: Issue) {

    console.log(issue);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.http.post<Issue>('http://localhost:8080/api/issues', issue, httpOptions).subscribe();
  }
  public loginWithOauth(): void {
    this.auth.fetchTokenUsingPasswordFlow('asidorch', 'kpass').then(resp => console.log(resp));
  }

  public getAccessToken(): void {

  }

  public isSignedIn(): boolean {
    return this.signedIn;
  }
}
