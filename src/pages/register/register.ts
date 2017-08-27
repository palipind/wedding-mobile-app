import { Component } from '@angular/core';
import { LoadingController, ToastController, NavController } from 'ionic-angular';
import { Push, PushToken} from '@ionic/cloud-angular';
import { UserDetailsPage } from '../../pages/user-details/user-details';
import { DeviceTokenApi } from '../../providers/deviceToken-api';
import { UserRegistrationData } from '../../providers/userRegistration-data';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [DeviceTokenApi]
})

export class RegistrationPage {
	//Needed for a bug in android where background
	//reduces in height when keyboard opens up.
	shouldHeight = document.body.clientHeight + 'px' ;

	weddingId: any;
  	constructor(
  		public navCtrl: NavController,
  		public push: Push,
  		public deviceTokenApi: DeviceTokenApi,
  		public toastCtrl: ToastController,
  		public loadingCtrl: LoadingController,
  		public userData : UserRegistrationData) {

	    this.push.register().then((t: PushToken) => {
	  		return this.push.saveToken(t);
		}).then((t: PushToken) => {
		});
	}

	registerUser() {

		//Set loader to end in 10 seconds. Stop it manually by calling dismiss
		let loading = this.loadingCtrl.create({
    	content: 'Please wait...',
    	dismissOnPageChange: true,
    	duration: 10000
    	});
  		loading.present();

		if (this.push.token != undefined) {
			this.deviceTokenApi.registerToken(this.weddingId, this.push.token.token)
			.subscribe(
				data => {
					loading.dismiss();
					console.log(data);
					this.userData.setDeviceToken(this.push.token.token);
					this.userData.setWeddingId(this.weddingId);
					this.navCtrl.setRoot(UserDetailsPage);
				},
				err => {
					loading.dismiss();
					var err = err.json();
					var error = err["error"] != null ? err["error"] : "CONNECTION_ERROR";
					this.handleError(error);
			});
		}
		else {
			console.log('Error cannot register, Token undefined');
		}
	}

	handleError(error: string) {
		var errorMessage;
		switch (error) {
			case "INVALID_REQUEST":
				errorMessage = "An error has occured. Please enter a Wedding ID or check your network connection";
				break;

			case "RECORD_NOT_FOUND":
				errorMessage = "We do not recognize this Wedding ID. Please try again.";
				break;

			case "CONNECTION_ERROR":
				errorMessage = "The server is unreachable. Please try again."
				break;

			default:
				errorMessage = "Error occurred. Please try again.";
				break;
		}

		let toast = this.toastCtrl.create({
    	message: errorMessage,
     	duration: 3000,
     	position:"top"
    	});
    	toast.present();
	}
}
