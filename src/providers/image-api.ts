import { Injectable } from '@angular/core';
import { Platform, ToastController } from 'ionic-angular';
import { Camera, File, FilePath } from 'ionic-native';
declare var cordova: any;
/**
* This class handles taking a new image from 
* device gallery or camera. It also handles saving
* the image to the device file system.
**/
@Injectable()
export class ImageApi {

	constructor(
		private platform: Platform,
		private toastCtrl: ToastController,  
		) {}

	/**
	* This method accepts a new image from user
	* depending on sourceType. It will return a 
	* promise that will contain the native path 
	* url to the image selected by the user.
	**/
	public takeImage(sourceType) : Promise<string> {
		var options = {
			quality: 100,
    		sourceType: sourceType,
    		saveToPhotoAlbum: false,
    		correctOrientation: true
  		};

  		return Camera.getPicture(options).then((imagePath) => {
  			// Special handling for Android library
  			if(this.platform.is('android') &&
  				sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
  				//This is needed to resolve the timestamp added in the end
  				return FilePath.resolveNativePath(imagePath)
  				.then((resolvedPath) => {
          			return resolvedPath;
  				});

  			} else {
  				return imagePath;
  			}
  		}, (err) => {
  			this.presentToast('Error occurred while taking image.');
  		}


  		);
	}

	/**
	* This method will save the file into the 
	* cordova data directory. This method returns true/false 
	* based on if the file was saved successfully
	**/
	public saveToDataDir(fromPath, fileName, newFileName) {
		File.copyFile(fromPath, fileName, cordova.file.dataDirectory, newFileName)
		.then(success => {
			//everything went well
		},
		error => {
			this.presentToast('Error while storing image.');
		});
	}

	/**
	* This method will take and save the image to the native
	* data cordova data directory. sourceType defines the camera
	* source type to be used to take the image. newFileName is the name
	* of the file to be saved in data directory. This method returns 
	* the native path of teh temporary image created by the 
	* Camera.getPicture() method.
	**/
	public takeImageAndSave(sourceType, newFileName) : Promise<string> {
		return this.takeImage(sourceType).then((imagePath) => {
			var path = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
			var fileName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      		this.saveToDataDir(path, fileName, newFileName);
      		return imagePath;
		})
	}

	private presentToast(text) {
		let toast = this.toastCtrl.create({
    	message: text,
    	duration: 3000,
    	position: 'top'
    	});
  		toast.present();
	}
}