import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  @Output() user = new EventEmitter<SocialUser>();
  private signedIn: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.authState.subscribe(user => {
      this.user.emit(user);
      this.signedIn = (user != null);
    });

  }

  signInWithGoogle() : void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut() : void {
    this.authService.signOut();
  }
}
