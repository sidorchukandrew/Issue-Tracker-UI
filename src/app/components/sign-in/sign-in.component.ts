import { Component, OnInit } from '@angular/core';
import { IssueService } from 'src/app/services/issue.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  private signinForm;
  constructor(private issueService: IssueService, private formBuilder: FormBuilder) {
    this.signinForm = formBuilder.group({
      username: '',
      password: ''
    });
  }

  ngOnInit() {
  }

  public submit(): void {
    this.issueService.signinWithOauth(this.signinForm.value['username'], this.signinForm.value['password']);
  }

  public getSigninForm() {
    return this.signinForm;
  }

}
