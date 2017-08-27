import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegistrationPage } from '../../pages/register/register';
import { EventsPage } from '../../pages/events/events';
import { DeviceTokenApi } from '../../providers/deviceToken-api';
import { WeddingEventApi } from '../../providers/weddingEvent-api';
import { UserRegistrationData } from '../../providers/userRegistration-data';
import { UserDetailsPage } from '../../pages/user-details/user-details';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html',
	providers: [DeviceTokenApi, WeddingEventApi]
})

export class HomePage {

	userName : string;

	menuItems = [
	{ "name": "Home", "icon":"home" },
	{ "name": "Events", "icon":"football" },
	{ "name": "Setup Profile","icon":"person"},
	{ "name": "About Us","icon":"information-circle"},
	{ "name": "Unregister","icon":"exit" }
	];

	constructor(
		public navCtrl: NavController,
		public deviceTokenApi: DeviceTokenApi,
		public weddingEventApi: WeddingEventApi,
		public userData: UserRegistrationData) {

		this.userData.getUserDetails().then((value) => {
			this.userName = value["name"];
		});
	}

	menuItemClicked(item) {
		var name = item["name"];
		switch(name) {
			
			case "Events":
			this.loadEvents();
			break;

			case "Setup Profile":
			this.navCtrl.push(UserDetailsPage);
			break;

			case "Unregister":
			this.unregister();
			break;
		}
	};

	/**
	*  Loads wedding events associated to a weddingId
	*/
	loadEvents(): void {
		this.userData.getWeddingId().then((weddingId) => {
			this.weddingEventApi.loadEvents(weddingId).subscribe(
				data => {
					this.navCtrl.push(EventsPage, data);
				},
				err => {
					console.log("Error occurred getting wedding events", err);
				}
			);
		});
	}

	/**
	*  Unregisters user by removing weddingId key from storage.
	*  WeddingId key when set makes HomePage as the app Root Page
	*/
	unregister(): void {
		this.userData.getDeviceToken().then((deviceToken) => {
			this.deviceTokenApi.deleteToken(deviceToken).subscribe(
				data => {
					this.userData.removeWeddingId();
					this.navCtrl.setRoot(RegistrationPage);
				},
				err => {
					//Not removing from storage in this case
					console.log("Error occurred during unregistration", err);
				}
			);
		});
	};
}
