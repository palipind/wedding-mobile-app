import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { RegistrationPage } from '../pages/register/register';
import { HomePage } from '../pages/home/home';
import { UserRegistrationData } from '../providers/userRegistration-data';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage : any;

  constructor(
    public platform: Platform,
    public userData: UserRegistrationData
    ) {

    platform.ready().then(() => {

      StatusBar.styleDefault();
      Splashscreen.hide();

      this.userData.isRegistered().then((value) => {
        this.rootPage = (value == true) ? HomePage : RegistrationPage;
      });
    });
  }
}
