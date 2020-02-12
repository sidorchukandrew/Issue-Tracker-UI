import { Component, OnInit, Input } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { IssueService } from 'src/app/services/issue.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private currentUser: string;
  constructor(private issueService: IssueService) { }

  ngOnInit() {
    this.currentUser = this.issueService.getCurrentUserFullName();
  }

  signout() {
    this.issueService.signout();
  }

  public getUsername(): string {
    return this.currentUser;
  }

}
