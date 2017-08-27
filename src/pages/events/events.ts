import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})

export class EventsPage {

	events: Array<any>;

	/*
	* Initialize navParams when push on this page
	* which should contain array of events
	*/
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		) {
		this.events = this.navParams.data;
	}
}
