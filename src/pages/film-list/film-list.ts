import { Component } from '@angular/core';
import { Platform, NavController, ModalController, ToastController, ActionSheetController, AlertController } from 'ionic-angular';
import { Clipboard } from '@ionic-native/clipboard';
import { TranslateService } from '@ngx-translate/core';

import { DataService } from '../../providers/data';
import { SharingService } from '../../providers/sharing';

import { FilmDetailsPage } from '../film-details/film-details';

@Component({
	template: '',
	selector: 'page-film-list'
})

export class FilmListPage {

	list: Array<any>;
	country: String;
	language: String;

	emptyMessage: Array<Boolean>;

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

		translate.setDefaultLang('en');

		this.list = new Array();
		this.emptyMessage = [false, false];
	}

	ionViewDidEnter() {
		this.dataService.getCountry().subscribe((country) => { this.country = country; });
		this.dataService.getLanguage().subscribe((language) => { this.language = language; });
		this.dataService.getList().subscribe((list) => {
			this.list = list;
			this.emptyMessage = [true, true];
			this.calcReleaseDays();
		});
	}

	openSettings() {
		let modal = this.modalCtrl.create('SettingsPage');
		modal.onDidDismiss(data => {
			this.ionViewDidEnter();
		});
		modal.present();
	}

	showFilmDetails(event, film) {
		this.navCtrl.push(FilmDetailsPage, { film: film, country: this.country });
	}

	showPressMenu(event, film) {
		// counter tap delay
		if (this.navCtrl.getActive().instance instanceof FilmDetailsPage) {
			return;
		}

		this.translate.get(['copy', 'share', 'refresh', 'remove', 'cancel']).subscribe(
			(response) => {

				let actionSheet = this.actionSheetCtrl.create({
					enableBackdropDismiss: false,
					buttons: [
						{
							text: response.share,
							icon: !this.platform.is('ios') ? 'share' : null,
							handler: () => {
								this.share(film);
							}
						},
						{
							text: response.copy,
							icon: !this.platform.is('ios') ? 'copy' : null,
							handler: () => {
								this.copyMorfilmsLink(film);
							}
						},
						{
							text: response.refresh,
							icon: !this.platform.is('ios') ? 'refresh' : null,
							handler: () => {
								this.refreshFilm(film);
							}
						},
						{
							text: response.remove,
							role: 'destructive',
							icon: !this.platform.is('ios') ? 'trash' : null,
							handler: () => {
								setTimeout(() => {
						        	this.delete(film);
						        }, 300)
							}
						},
						{
							text: response.cancel,
							role: 'cancel',
							icon: !this.platform.is('ios') ? 'close' : null
						}
					]
				});

				actionSheet.present();

			}
		);
	}

	share(film) {
		if (film.release_country_days == 1) {
			this.translate.get('notification_tomorrow').subscribe((notification_today) => {
				this.sharingService.shareFilmWithMessage(film, notification_today.replace("$1", film.title));
			});
		} else if (film.release_country_days > 0 && film.release_country_days < 999) {
			this.translate.get('notification_days').subscribe((notification_days) => {
				this.sharingService.shareFilmWithMessage(film, notification_days.replace("$1", film.title).replace("$2", film.release_country_days));
			});
		} else {
			this.sharingService.shareFilm(film);
		}
	}

	copyMorfilmsLink(film) {
		this.clipboard.copy('https://morfilms.link/movie/?l=' + this.language + '&c=' + this.country + '&m=' + film.id);
		this.translate.get('toast_copy').subscribe((toast_copy) => {
			let toast = this.toastCtrl.create({
				message: toast_copy,
				duration: 1500,
				position: 'bottom'
			});
			toast.present();
		});
	}

	refreshFilm(film) {
		this.dataService.refreshFilm(film).subscribe(() => {
			this.calcReleaseDays();
			this.translate.get('toast_refresh').subscribe((toast_refresh) => {
				let toast = this.toastCtrl.create({
					message: toast_refresh,
					duration: 1500,
					position: 'bottom'
				});
				toast.present();
			});
		});
	}

	delete(film) {
		this.translate.get(['alert_remove', 'cancel', 'remove']).subscribe(
			(response) => {
				let confirm = this.alertCtrl.create({
					title: response.alert_remove,
					buttons: [
						{
							text: response.cancel
						},
						{
							text: response.remove,
							handler: () => {
								this.dataService.removeFilm(film).subscribe();
							}
						}
					]
				});
				confirm.present();
			}
		);
	}

	getBackdrop(film) {
		return 'url(https://image.tmdb.org/t/p/w1280' + (film.backdrop_path ? film.backdrop_path : film.poster_path) + ')';
	}

	getDaysLeft(film) {
		var releaseDate = null;

		// IN THEATERS
		for (var i = 0; i < film.release_dates.results.length; i++) {
			if (film.release_dates.results[i].iso_3166_1 == this.country) {
				for (var j = 0; j < film.release_dates.results[i].release_dates.length; j++) {
					if (film.release_dates.results[i].release_dates[j].type == 3) {
						releaseDate = new Date(film.release_dates.results[i].release_dates[j].release_date);
						break;
					}
				}
			}
		}

		// DIGITAL
		for (var a = 0; a < film.release_dates.results.length; a++) {
			if (film.release_dates.results[a].iso_3166_1 == this.country) {
				for (var b = 0; b < film.release_dates.results[a].release_dates.length; b++) {
					if (film.release_dates.results[a].release_dates[b].type == 4) {
						var digitalReleaseDate = new Date(film.release_dates.results[a].release_dates[b].release_date);
						if (releaseDate == null || releaseDate < digitalReleaseDate) releaseDate = digitalReleaseDate;
						break;
					}
				}
			}
		}

		if (releaseDate == null) {
			if (film.release_date == "" || new Date(film.release_date) > new Date()) {
				film.release_country_days = 999;
				this.emptyMessage[0] = false;
			} else {
				film.release_country_days = 0;
				this.emptyMessage[1] = false;
			}
		} else {
			var oneDay = 24 * 60 * 60 * 1000;
			var today = new Date();

			today.setHours(0, 0, 0, 0);
			releaseDate.setHours(0, 0, 0, 0);

			var diffDays = Math.round((releaseDate.getTime() - today.getTime()) / (oneDay));

			film.release_country_days = diffDays;

			if (diffDays > 0)
				this.emptyMessage[0] = false;
			else
				this.emptyMessage[1] = false;
		}
	}

	calcReleaseDays() {
		var sortByKey = function(array, key1, key2) {
			return array.sort(function(a, b) {
				var x1 = a[key1]; var y1 = b[key1];
				var x2 = a[key2]; var y2 = b[key2];

				if (x1 < y1) return -1;
				if (x1 > y1) return 1;
				if (x2 < y2) return -1;
				if (x2 > y2) return 1;
				return 0;
			});
		}

		for (var i = 0; i < this.list.length; i++) {
			this.getDaysLeft(this.list[i]);
		}

		this.list = sortByKey(this.list, 'release_country_days', 'title');
	}

	alphabetical(array: Array<any>, args: string): Array<any> {
		array.sort((a: any, b: any) => {
			if (a[args] < b[args]) {
				return -1;
			} else if (a[args] > b[args]) {
				return 1;
			} else {
				return 0;
			}
		});
		return array;
	}

}
