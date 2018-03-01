import { HelloIonicPage } from './../hello-ionic/hello-ionic';
import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { SignInPage } from './sign-in';

@NgModule({
  declarations: [
    SignInPage,
  ],
  imports: [
    IonicPageModule.forChild(SignInPage),
    // IonicModule.forRoot(HelloIonicPage, {}, {
    //   links: [
        
    //     { component: SignInPage, name: 'SignInPage', segment: 'sign-in' }
    //   ]
    // })
  ],
})
export class SignInPageModule {}
