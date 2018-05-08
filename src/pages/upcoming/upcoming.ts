import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, ModalController, ToastController, ActionSheetController, AlertController } from 'ionic-angular';
import { Clipboard } from '@ionic-native/clipboard';
import { TranslateService } from '@ngx-translate/core';

import { DataService } from '../../providers/data';
import { SharingService } from '../../providers/sharing';

import { FilmListPage } from '../film-list/film-list';

@IonicPage()

@Component({
	selector: 'page-upcoming',
	templateUrl: 'upcoming.html'
})

export class UpcomingPage extends FilmListPage {

	constructor(
		public actionSheetCtrl: ActionSheetController,
		public alertCtrl: AlertController,
		public clipboard: Clipboard,
		public dataService: DataService,
		public modalCtrl: ModalController,
		public navCtrl: NavController,
		public platform: Platform,
		public sharingService: SharingService,
		public toastCtrl: ToastController,
		public translate: TranslateService

	) {

		super(
			actionSheetCtrl,
			alertCtrl,
			clipboard,
			dataService,
			modalCtrl,
			navCtrl,
			platform,
			sharingService,
			toastCtrl,
			translate
		);
	}

}
