import { SignInPage } from './../sign-in/sign-in';
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  email: string;

  constructor(public nav: NavController) {
    this.nav = nav;
    this.email = window.localStorage.getItem('email');

    
  }
  
  logout() {
    window.localStorage.removeItem('email');
    window.localStorage.removeItem('password');

    this.nav.setRoot(SignInPage);
    this.nav.popToRoot();
  }    

  
}
