import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Issue } from '../../model/issue';
import { IssueService } from 'src/app/services/issue.service';

@Component({
  selector: 'app-all-issues',
  templateUrl: './all-issues.component.html',
  styleUrls: ['./all-issues.component.css']
})

export class AllIssuesComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<Issue>;

  myDataSource: any;
  displayedColumns = ['id', 'issue', 'resolved', 'reporter', 'severity', 'status', 'dateDue', 'assignedTo'];

  applyFilter(filterValue: string) {
    this.myDataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(private issueService: IssueService) { }

  ngOnInit() {
    this.render();

  }

  ngAfterViewInit() {

  }

  render() {
    this.issueService.getAllIssues().subscribe(data => {
      var allIssues: Issue[] = new Array();
      var index: number = 0;
      while (data[index]) {

        // To copy into
        let issue: Issue = new Issue();

        // JSON 
        let issueObject = data[index];

        // Issue's id
        issue.id = issueObject['id'];

        // Date issue was created
        issue.dateCreated = issueObject['dateCreated'];

        // Date due
        issue.dateDue = issueObject['dateDue'];

        // Issue description
        issue.issue = issueObject['issue'];

        // Was the issue resolved yet
        issue.resolved = issueObject['resolved'];


        // Getting severity
        var severity = issueObject['severity'];
        issue.severity = severity['name'];

        // Getting status
        var status = issueObject['status'];
        issue.status = status['name'];

        // Getting reporter
        var reporter = issueObject['reporter'];
        issue.reporter = reporter['name'];

        // Getting reporter
        var assignedTo = issueObject['assignedTo'];
        issue.assignedTo = reporter['name'];

        allIssues.push(issue);
        index++;
      }
      this.myDataSource = new MatTableDataSource();
      this.myDataSource.data = allIssues;
      this.myDataSource.paginator = this.paginator;
      this.myDataSource.sort = this.sort;
    }
    );
  }
}
