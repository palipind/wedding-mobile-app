import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { IonicStorageModule } from '@ionic/storage';
import { RegistrationPage } from '../pages/register/register';
import { HomePage } from '../pages/home/home';
import { EventsPage } from '../pages/events/events';
import { UserDetailsPage } from '../pages/user-details/user-details';
import { UserRegistrationData } from '../providers/userRegistration-data';
const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'a8357937'
  },
  'push': {
    'sender_id': '1067383555643',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#343434'
      }
    }
  }
};

@NgModule({
  declarations: [
    MyApp,
    RegistrationPage,
    HomePage,
    EventsPage,
    UserDetailsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RegistrationPage,
    HomePage,
    EventsPage,
    UserDetailsPage
  ],
  providers: [UserRegistrationData, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
