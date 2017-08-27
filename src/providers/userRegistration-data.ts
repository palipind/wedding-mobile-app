import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { User } from '../models/user';

/**
* A provider to interact with storage api
* to handle user registration data such as 
* device token and wedding id registered
**/
@Injectable()
export class UserRegistrationData {
	
	//Keys used for storage api
	DEVICE_TOKEN = 'deviceToken';
	WEDDING_ID = 'weddingId';
	USER_DETAILS = 'userDetails';

	constructor(
		public storage: Storage
		) {}

	getDeviceToken(): Promise<string> {
		return this.storage.get(this.DEVICE_TOKEN).then((value) => { 
			return value;
		}); 
	};

	setDeviceToken(deviceToken: string): void {
		this.storage.set(this.DEVICE_TOKEN, deviceToken);
	};

	getWeddingId(): Promise<string> {
		return this.storage.get(this.WEDDING_ID).then((value) => {
			return value;
		});
	};

	setWeddingId(weddingId: string): void {
		this.storage.set(this.WEDDING_ID, weddingId);
	};

	removeWeddingId(): void {
		this.storage.remove(this.WEDDING_ID);
	};

	/**
	* Returns true/false by checking for weddingId in storage
	*/
	isRegistered(): Promise<boolean> {
		return this.storage.get(this.WEDDING_ID).then((value) => {
			return value != null;
		});
	};

	setUserDetails(userDetails: User): void {
		this.storage.set(this.USER_DETAILS, userDetails);
	}

	getUserDetails() : Promise<User> {
		return this.storage.get(this.USER_DETAILS).then((value) => {
			return value;
		});
	}
}