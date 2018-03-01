import { HelloIonicPage } from './../hello-ionic/hello-ionic';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';



/**
 * Generated class for the SignInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {

  credentialsForm: FormGroup;

  email: AbstractControl;
  password: AbstractControl;  

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder) {

    let emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';

    this.credentialsForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex), Validators.minLength(8), Validators.maxLength(30)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });

  }

  ionViewDidEnter() {
    if ((window.localStorage.getItem('email') === "undefined" || window.localStorage.getItem('email') === null) &&
      (window.localStorage.getItem('password') === "undefined" || window.localStorage.getItem('password') === null)) {
      //  this.rootPage = SignInPage;
    } else {
      this.navCtrl.push(HelloIonicPage);
    }
  }

  onSubmit(value: any): void {
    if (this.credentialsForm.valid) {
      window.localStorage.setItem('email', value.email);
      window.localStorage.setItem('password', value.password);

      let email = this.credentialsForm.controls['email'];
      let password = this.credentialsForm.controls['password'];

      console.log('this.credentialsForm: ' + email);
      console.log('this.credentialsForm: ' + password);

      this.navCtrl.push(HelloIonicPage);
    }
  }   

  onSignIn() {
    //this.logger.info('SignInPage: onSignIn()');
    let email = this.credentialsForm.controls['email'];
    let password = this.credentialsForm.controls['password'];

    console.log('this.credentialsForm: ' + email);
    console.log('this.credentialsForm: ' + password);
    this.navCtrl.push(HelloIonicPage);
  }

  onForgotPassword() {
    //this.logger.info('SignInPage: onForgotPassword()');
    console.log('SignInPage: onForgotPassword()');
  } 

}
