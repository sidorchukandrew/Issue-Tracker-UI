import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Issue } from '../../model/issue';
import { IssueService } from 'src/app/services/issue.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-issue',
  templateUrl: './issue-details.component.html',
  styleUrls: ['./issue-details.component.css']
})
export class IssueDetailsComponent implements OnInit {

  private id;
  private updateIssueForm;
  private currentIssue: Issue;
  private users: string[] = new Array();

  constructor(private router: Router, private route: ActivatedRoute, private issueService: IssueService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.issueService.getIssueBasedOnId(this.id).subscribe(data => {

      this.updateIssueForm = this.formBuilder.group({
        id: data['id'],
        issue: data['issue'],
        resolved: data['resolved'],
        dateDue: data['dateDue'],
        dateCreated: data['dateCreated'],

        assignedTo: this.getName(data['assignedTo']),
        severity: this.getName(data['severity']),
        status: this.getName(data['status']),
        reporter: this.getName(data['reporter'])
      });

      this.currentIssue = new Issue();
      this.currentIssue.reportedBy = this.getName(data['reporter']);
      this.currentIssue.assignedTo = this.getName(data['assignedTo']);
      this.currentIssue.status = this.getName(data['status']);
      this.currentIssue.severity = this.getName(data['severity']);
      this.currentIssue.id = data['id'];
    });

    this.issueService.getAllUsers().subscribe(data => {
      let index: number = 0;

      while (data[index]) {
        var jsonUserObject = data[index];
        this.users.push(jsonUserObject['name']);
        index++;
      }
    });
  }

  private getName(jsonObject: any): string {
    return jsonObject['name'];
  }

  public getCurrentIssue(): Issue {
    return this.currentIssue;
  }

  public update(): void {

  }
}
