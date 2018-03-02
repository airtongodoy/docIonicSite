import { Usuario } from './../../app/models/Usuario';

import { HelloIonicPage } from './../hello-ionic/hello-ionic';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Facebook } from '@ionic-native/facebook';
import { AlertController } from 'ionic-angular';



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
  varMail: string;
  email: AbstractControl;
  password: AbstractControl;  

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              public facebook: Facebook,
              private alertCtrl: AlertController
) {

    let emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';

    this.credentialsForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex), Validators.minLength(8), Validators.maxLength(30)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });

  }

  presentAlert(usuario) {
    let alert = this.alertCtrl.create({
      title: usuario.nome,
      subTitle: usuario.email,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  //método para chamar api do facebook e salvar no banco o usuario    
  loginFacebook() {
    let permissions = new Array<string>();
    permissions = ["public_profile", "email"];

    this.facebook.login(permissions).then((response) => {
      let params = new Array<string>();

      this.facebook.api("/me?fields=name,email", params)
        .then(res => {

          //estou usando o model para criar os usuarios
          let usuario = new Usuario();
          usuario.nome = res.name;
          usuario.email = res.email;
          usuario.senha = res.id;
          usuario.login = res.email;

          this.logar(usuario);
        }, (error) => {
          alert(error);
          console.log('ERRO LOGIN: ', error);
        })
    }, (error) => {
      alert(error);
    });
  }

  logar(usuario: Usuario) {
    // this.salvarService.salvarFacebook(usuario).then(() => {
    //     console.log('Usuario cadastrado via facebook com sucesso!');
    //   })
    this.presentAlert(usuario);
    console.log(usuario);
  }

  ionViewDidEnter() {
    // varMail = "asg@terra.com";
    
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
