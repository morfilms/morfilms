import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, LoadingController, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';

import { DataService } from '../../providers/data';
import { NotificationsService } from '../../providers/notifications';
import { UtilsService } from '../../providers/utils';

@IonicPage()

@Component({
	selector: 'page-settings',
	templateUrl: 'settings.html'
})

export class SettingsPage {

	premiumProduct: any = { title: '', price:'' };

	country: String;
	language: String;

	notify: Boolean;
	notifyDaysBefore: String;
	notifyTime: String;

	theme: String;

	constructor(
		private dataService: DataService,
		private loadingCtrl: LoadingController,
		private navCtrl: NavController,
		private notificationsService: NotificationsService,
		private platform: Platform,
		private statusBar: StatusBar,
		private translate: TranslateService,
		private utilsService: UtilsService,
		private viewCtrl: ViewController

	) {

		if(this.platform.is('cordova')) this.statusBar.styleLightContent();
		this.translate.setDefaultLang('en');

		this.dataService.getCountry().subscribe((country) => { this.country = country; });
		this.dataService.getLanguage().subscribe((language) => { this.language = language; });

		this.dataService.getNotify().subscribe((notify) => { this.notify = notify; });
		this.dataService.getNotifyDaysBefore().subscribe((notifyDaysBefore) => { this.notifyDaysBefore = notifyDaysBefore; });
		this.dataService.getNotifyTime().subscribe((notifyTime) => { this.notifyTime = notifyTime; });

		this.dataService.getStorageTheme().subscribe((theme) => { this.theme = theme; });
	}

	ionViewWillEnter() {

	}

	dismiss() {
		if(this.theme == 'morfilms-dark-theme' || this.theme == 'blue-velvet-theme') {
			if(this.platform.is('cordova')) this.statusBar.styleLightContent();
		} else {
			if(this.platform.is('cordova')) this.statusBar.styleDefault();
		}
		this.viewCtrl.dismiss();
	}

	showOpensource() {
		this.navCtrl.push('SettingsOpensourcePage');
	}

	showSync() {
		this.navCtrl.push('SettingsSyncPage');
	}

	saveCountry() {
		this.dataService.getCountry().subscribe((country) => {
			if (country != this.country) {
				this.notificationsService.settingsChangeScheduleAll(this.notify, this.notifyDaysBefore, this.notifyTime, this.country);
				this.dataService.setCountry(this.country).subscribe();
			}
		});
	}

	saveLanguage() {
		this.translate.use(this.language.toString());
		this.translate.get('translating').subscribe((translating) => {
			let loading = this.loadingCtrl.create({
				content: translating
			});
			loading.present();

			this.dataService.getLanguage().subscribe((language) => {
				if (language != this.language) {
					this.dataService.setLanguage(this.language).subscribe(() => {
						this.dataService.getList().subscribe((list) => {
							for (var i = 0; i < list.length; i++) {
								this.dataService.refreshFilm(list[i]).subscribe();
								if (i % 35 == 0) { this.utilsService.sleep(10000); }
							}
							loading.dismiss();
						});
					});
				} else {
					loading.dismiss();
				}

			});
		});
	}

	saveNotify() {
		this.dataService.getNotify().subscribe((notify) => {
			if (notify != this.notify) {
				this.notificationsService.settingsChangeScheduleAll(this.notify, this.notifyDaysBefore, this.notifyTime, this.country);
				this.dataService.setNotify(this.notify).subscribe();
			}
		});
	}

	saveNotifyDaysBefore() {
		this.dataService.getNotifyDaysBefore().subscribe((notifyDaysBefore) => {
			if (notifyDaysBefore != this.notifyDaysBefore) {
				this.notificationsService.settingsChangeScheduleAll(this.notify, this.notifyDaysBefore, this.notifyTime, this.country);
				this.dataService.setNotifyDaysBefore(this.notifyDaysBefore).subscribe();
			}
		});
	}

	saveNotifyTime() {
		this.dataService.getNotifyTime().subscribe((notifyTime) => {
			if (notifyTime != this.notifyTime) {
				this.notificationsService.settingsChangeScheduleAll(this.notify, this.notifyDaysBefore, this.notifyTime, this.country);
				this.dataService.setNotifyTime(this.notifyTime).subscribe();
			}
		});
	}

	saveTheme() {
		this.dataService.setTheme(this.theme);
		setTimeout(() => { this.dismiss(); }, 300)
	}
}
