import { Component } from '@angular/core';
import { IssueService } from '../services/issue.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Issue Tracker';
  opened: boolean = false;
  private signedIn: boolean = false;

  constructor(private issueService: IssueService) {
    this.signedIn = issueService.isSignedIn();
  }

  public isSignedIn(): boolean {
    return this.signedIn;
  }
}
