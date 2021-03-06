import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { IssueService } from '../../services/issue.service';
import { Issue } from '../../model/issue';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-right-side-nav',
  templateUrl: './right-side-nav.component.html',
  styleUrls: ['./right-side-nav.component.css']
})
export class RightSideNavComponent implements OnInit {

  users: string[] = new Array();
  newIssueForm;

  constructor(formBuilder: FormBuilder, private issueService: IssueService, private snackBar: MatSnackBar) {
    this.newIssueForm = formBuilder.group({
      issue: '',
      dateDue: Date(),
      assignedTo: '',
      severity: '',
      resolved: false,
      status: ''
    });
  }

  ngOnInit() {
    this.issueService.getAllUsers().subscribe(data => {
      let index: number = 0;

      while (data[index]) {
        var jsonUserObject = data[index];
        this.users.push(jsonUserObject['name']);
        index++;
      }
    });
  }

  submit() {
    const formData: Issue = new Issue();
    formData.issue = this.newIssueForm.value['issue'];
    formData.assignedTo = this.newIssueForm.value['assignedTo'];
    formData.dateDue = new Date(this.newIssueForm.value['dateDue']).toISOString().slice(0, 10);
    formData.resolved = this.newIssueForm.value['resolved'];
    formData.severity = this.newIssueForm.value['severity'];
    formData.status = this.newIssueForm.value['status'];
    formData.dateCreated = new Date().toISOString().slice(0, 10);
    formData.reporter = this.issueService.getCurrentUserFullName();
    this.issueService.submitNewIssue(formData);
    this.showSuccessMessage();
  }

  showSuccessMessage(): void {
    this.snackBar.open("Saved successfully", "", { duration: 2000, });
  }
}

