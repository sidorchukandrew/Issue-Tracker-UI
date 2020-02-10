import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-issue',
  templateUrl: './issue-details.component.html',
  styleUrls: ['./issue-details.component.css']
})
export class IssueDetailsComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }
  public id;

  ngOnInit() {
    // this.id = this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) =>
    //     params.get('id')
    //   ));

    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
  }

}
