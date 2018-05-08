import { Injectable } from '@angular/core';

@Injectable()
export class NavigationService {

	timestamp;

	constructor() { }

	getTimestamp() {
		return this.timestamp;
	}

	setTimestamp() {
		this.timestamp = Math.floor(Date.now());
		// console.log('SETTING TIMESTAMP ' + this.timestamp);
		return this.timestamp;
	}

	push(navCtrl, requestTimestamp, page, data) {
		// console.log('PUSH IF UNIQUE TIME STAMP ' + this.timestamp + ' EQ REQUEST TIMESTAMP ' + requestTimestamp);
		if(this.timestamp == requestTimestamp)
			navCtrl.push(page, data);
	}
}
