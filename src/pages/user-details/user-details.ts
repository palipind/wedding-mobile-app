import { Component } from '@angular/core';
import { NavController, 
	ActionSheetController, 
	ToastController, 
	Platform, 
	LoadingController, 
	Loading } from 'ionic-angular';
import { Camera, File, FilePath } from 'ionic-native';
import { ImageApi } from '../../providers/image-api';
import { User } from '../../models/user';
import { UserRegistrationData } from '../../providers/userRegistration-data';
import { HomePage } from '../home/home';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
declare var cordova: any;
@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html',
  providers: [ImageApi]
})

export class UserDetailsPage {

	//Needed for a bug in android where background
	//reduces in height when keyboard opens up.
	shouldHeight = document.body.clientHeight + 'px' ;
	txtName: any;
	radSide: any;
	user: User;
	loading: Loading;
	profileImage;
	
	@ViewChild(Slides) slides: Slides;
	
	constructor(
		public navCtrl: NavController, 
		public actionSheetCtrl: ActionSheetController,
		public toastCtrl: ToastController, 
		public platform: Platform, 
		public loadingCtrl: LoadingController,
		private imageApi: ImageApi,
		private userRegistrationData: UserRegistrationData) {
		
		//TODO change this to copy the default picture on app load
		//over here no need to check just add 
		File.checkFile(cordova.file.dataDirectory, "profileImage.jpg")
		.then((value) => {
			this.profileImage = cordova.file.dataDirectory+"profileImage.jpg";
		},
		error => {
			this.profileImage = "assets/img/default-profileImage.png";
		});
	}

	public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(Camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(Camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  	public takePicture(sourceType) {

  	this.imageApi.takeImageAndSave(sourceType, "profileImage.jpg")
  	.then((imagePath) => {
  		this.profileImage = imagePath;
  		});
	}

	submitForm() {
		this.user = new User(this.txtName,this.radSide);
		this.userRegistrationData.setUserDetails(this.user);
		this.navCtrl.setRoot(HomePage);
	}

	slideNext() {
		this.slides.slideNext();
	}
}