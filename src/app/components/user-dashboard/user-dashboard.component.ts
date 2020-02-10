import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { IssueService } from 'src/app/services/issue.service';
import { Issue } from '../../model/issue';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})


export class UserDashboardComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<Issue>;

  myIssuesDataSource: any;
  overdueIssuesDataSource: any;
  myIssuesDisplayedColumns = ['issue', 'resolved', 'severity', 'status', 'dateDue'];
  overdueIssuesDisplayedColumns = ['description', 'overdueBy'];
  issuesAssigned: Issue[];
  percentResolved: number;
  private numResolved: number = 0;

  issuesTotal: number = 0;
  openedTotal: number = 0;
  closedTotal: number = 0;
  pausedTotal: number = 0;
  unopenedTotal: number = 0;
  breakdownSelected: string;

  statusBreakdown: boolean = true;
  severityBreakdown: boolean = false;
  resolvedBreakdown: boolean = false;

  breakpoint: number = 3;
  dashboardBreakpoint: number = 2;
  rowHeight: number = 525;

  applyFilter(filterValue: string) {
    this.myIssuesDataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private issueService: IssueService) { }

  ngOnInit() {
    this.render();

    this.issueService.getAllIssues().subscribe(data => {

      var overdueIssues: Object[] = new Array();
      var today = new Date().getTime();

      while (data[this.issuesTotal]) {

        var issue = data[this.issuesTotal];
        var status = issue['status'];

        if (status['name'] == 'Opened')
          this.openedTotal++;
        else if (status['name'] == 'Closed')
          this.closedTotal++;
        else if (status['name'] == 'Paused')
          this.pausedTotal++;
        else if (status['name'] == 'Unopened')
          this.unopenedTotal++;

          var dateOfIssue = new Date(issue['dateDue']).getTime();
          
          if((dateOfIssue < today)  && !issue['resolved']) {
            var overdue = Math.floor((today - dateOfIssue) / (1000*60*60*24));

            if(overdue != 0)
              overdueIssues.push({id: issue['id'], description: issue['issue'], overdueBy: overdue});
        }

        this.issuesTotal++;
      }

      console.log(overdueIssues);
      this.overdueIssuesDataSource = new MatTableDataSource();
      this.overdueIssuesDataSource.data = overdueIssues;
    });

    if(window.innerWidth <= 1300) {
      this.breakpoint = 2;
      this.dashboardBreakpoint = 2;
    }
    else {
      this.breakpoint = 3;
      this.dashboardBreakpoint = 2;
    }
  }

  ngAfterViewInit() {

  }

  onResize(event) {
    if(window.innerWidth <= 1300) {
      this.breakpoint = 2;
      this.dashboardBreakpoint = 2;
    }
    else {
      this.breakpoint = 3;
      this.dashboardBreakpoint = 2;
      this.rowHeight = 525;
    }
  }

  render() {
    this.issueService.getAllIssuesAssignedToUser("John Doe").subscribe(
      data => {
        this.issuesAssigned = this.extractIssuesFromJSON(data);
        this.myIssuesDataSource = new MatTableDataSource();
        this.myIssuesDataSource.data = this.issuesAssigned;
        this.myIssuesDataSource.paginator = this.paginator;
        this.myIssuesDataSource.sort = this.sort;

        this.percentResolved = this.numResolved / this.issuesAssigned.length * 100;
        console.log(this.percentResolved);
      }
    );

  }

  extractIssuesFromJSON(data: any): Issue[] {
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
      if (issue.resolved)
        this.numResolved++;

      // Getting severity
      var severity = issueObject['severity'];
      issue.severity = severity['name'];

      // Getting status
      var status = issueObject['status'];
      issue.status = status['name'];

      // Getting reporter
      var reporter = issueObject['reporter'];
      issue.reportedBy = reporter['name'];

      // Getting reporter
      var assignedTo = issueObject['assignedTo'];
      issue.assignedTo = reporter['name'];

      if(!issue.resolved)
        allIssues.push(issue);
      index++;
    } // end while

    return allIssues;
  } // end function

  public showStatusBreakdown() {
    this.statusBreakdown = true;
    this.severityBreakdown = false;
    this.resolvedBreakdown = false;
    this.breakdownSelected = "Status";
  }

  public showSeverityBreakdown() {
    this.statusBreakdown = false;
    this.severityBreakdown = true;
    this.resolvedBreakdown = false;
    this.breakdownSelected = "Severity";

  }

  public showResolvedBreakdown() {
    this.statusBreakdown = false;
    this.severityBreakdown = false;
    this.resolvedBreakdown = true;
    this.breakdownSelected = "Resolved";
  }

  public loginWithOauth() {
    this.issueService.loginWithOauth();
  }

  public showAccess() {
    console.log(this.issueService.getAccessToken());
  }
}
