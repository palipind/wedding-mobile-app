import { Component } from '@angular/core';
import { LoadingController, ToastController, NavController } from 'ionic-angular';
import { Push, PushToken} from '@ionic/cloud-angular';
import { WeddingApi } from '../../providers/wedding-api'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [WeddingApi]
})

export class HomePage {	
	weddingId: any; 
  	constructor(public navCtrl: NavController, public push: Push, private weddingApi: WeddingApi,
  		public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
	    this.push.register().then((t: PushToken) => {
	  		return this.push.saveToken(t);
		}).then((t: PushToken) => {
	  		console.log('Token saved:', t.token);
		});
	}

	register() {
		//Set loader to end in 10 seconds. Stop it manually by calling dismiss
		let loading = this.loadingCtrl.create({
    	content: 'Please wait...',
    	dismissOnPageChange: true,
    	duration: 10000
    	});
  		loading.present();

		if (this.push.token != undefined) {
			this.weddingApi.registerToken(this.weddingId, "tryyy").subscribe(
				data => {
					loading.dismiss();
					var error = data["error"];
					if(error) {
						this.handleError(error);
					}
					console.log(data);
				},
				err => {
					loading.dismiss();
					this.handleError("CONNECTION_ERROR");
					console.log('ERROR:'+ err.toString());
			});
		}
		else {
			console.log('Error cannot register, Token undefined');
		}
	}

	handleError(error: string) {
		var errorMessage;
		switch (error) {
			case "INVALID_ENTRY":
				errorMessage = "We do not recognize this Wedding ID. Please try again.";
				break;
				
			case "CONNECTION_ERROR":
				errorMessage = "The server is unreachable. Please try again."	
				break;	
			
			case "UNKNOWN":
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
