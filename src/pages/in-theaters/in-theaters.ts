import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { DataService } from '../../providers/data';
import { NavigationService } from '../../providers/navigation';
import { TmdbService } from '../../providers/tmdb';
import { UtilsService } from '../../providers/utils';

import { FilmDetailsPage } from '../film-details/film-details';

@IonicPage()

@Component({
	selector: 'page-in-theaters',
	templateUrl: 'in-theaters.html'
})

export class InTheatersPage {

	inTheatersList: Array<any>;

	emptyMessage: Boolean;

	constructor(
		private dataService: DataService,
		private modalCtrl: ModalController,
		private navCtrl: NavController,
		private navigation: NavigationService,
		private tmdbService: TmdbService,
		private translate: TranslateService,
		private utilsService: UtilsService

	) {

		this.translate.setDefaultLang('en');
		this.emptyMessage = false;
	}

	ionViewDidEnter() {
		this.dataService.getLanguage().subscribe((language) => {
			this.dataService.getCountry().subscribe((country) => {
				this.dataService.getCacheInTheaters().subscribe((cacheInTheaters) => {
					if (cacheInTheaters != null && this.tmdbService.isValidCache(cacheInTheaters.cache, language, country)) {

						this.inTheatersList = cacheInTheaters.results;
						this.emptyMessage = (this.inTheatersList.length < 1);

					} else {

						this.tmdbService.getNewInTheaters(language, country).subscribe(
							(data) => {
								this.inTheatersList = data.results;
								this.emptyMessage = (this.inTheatersList.length < 1);

								data.cache = { language: language, region: country, date: new Date().toJSON().split('T')[0] };
								this.dataService.setCacheInTheaters(data).subscribe();
							},
							(error) => { if(this.utilsService.isDevelopment()) console.log(error); this.emptyMessage = true; }
						);

					}
				});
			});
		});
	}

	openSettings() {
		let modal = this.modalCtrl.create('SettingsPage');
		modal.onDidDismiss(data => {
			this.ionViewDidEnter();
		});
		modal.present();
	}

	showFilmDetails(film) {
		var requestTimestamp = this.navigation.setTimestamp();
		this.dataService.getLanguage().subscribe((language) => {
			this.dataService.getCountry().subscribe((country) => {
				this.tmdbService.getFilmDetails(film.id, language).subscribe(
					(data) => { this.navigation.push(this.navCtrl, requestTimestamp, FilmDetailsPage, { film: data, country: country }); },
					(error) => { if(this.utilsService.isDevelopment()) console.log(error); }
				);
			});
		});
	}

}
