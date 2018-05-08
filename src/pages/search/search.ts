import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { DataService } from '../../providers/data';
import { TmdbService } from '../../providers/tmdb';
import { UtilsService } from '../../providers/utils';

@IonicPage()

@Component({
	selector: 'page-search',
	templateUrl: 'search.html'
})

export class SearchPage {

	country: String;
	language: String;

	showAds: Boolean;
	emptyMessage: Boolean;
	searching: Boolean;
	searchQuery: String;
	searchResults: Array<any> = [];


	constructor(
		private dataService: DataService,
		private modalCtrl: ModalController,
		private tmdbService: TmdbService,
		private translate: TranslateService,
		private utilsService: UtilsService

	) {

		this.translate.setDefaultLang('en');

		this.showAds = true;
		this.emptyMessage = true;
		this.searching = false;
		this.searchQuery = "";
		this.searchResults = new Array();

	}

	ionViewWillEnter() {

		this.dataService.autoRefreshFilms().subscribe(() => {
			this.setAdded();
		});

		this.dataService.getLanguage().subscribe((language) => {
			this.language = language;
			this.dataService.getCountry().subscribe((country) => {
				this.country = country;
				if (!this.searching) {
					this.tmdbService.getUpcoming(this.language, this.country).subscribe(
						(data) => {
							this.searchResults = data.results;
							this.emptyMessage = (this.searchResults.length < 1);
							this.setAdded();
						},
						(error) => { if(this.utilsService.isDevelopment()) console.log(error); this.emptyMessage = true; }
					);
				}
			});
		});
	}

	textFocus() {
		this.showAds = false;
		this.searchQuery = "";
		this.searchFilm();

	}

	textBlur() {
		this.showAds = true;
	}

	setAdded() {
		this.dataService.getList().subscribe((list) => {
			for (var i = 0; i < this.searchResults.length; i++) {
				this.searchResults[i].added = false;
				for (var j = 0; j < list.length; j++)
					if (this.searchResults[i].id == list[j].id) {
						this.searchResults[i].added = true;
						continue;
					}
			}
		});
	}

	openSettings() {
		let modal = this.modalCtrl.create('SettingsPage');
		modal.onDidDismiss(data => {
			this.ionViewWillEnter();
		});
		modal.present();
	}

	searchFilm() {
		if (this.searchQuery.length > 1) {
			// console.log('SEARCH ' + this.searchQuery );
			var searchRequest = this.searchQuery;
			this.searching = true;
			this.tmdbService.getSearch(searchRequest, this.language).subscribe(
				(data) => {
					// console.log('NOW SEARCHING ' + this.searchQuery + ' AND RESULTS RECEIVED FOR ' + searchRequest );
					if (searchRequest == this.searchQuery) {
						// console.log('PRINTING RESULTS FOR ' + searchRequest);
						this.searchResults = data.results;
						this.setAdded();
					}
				},
				(error) => { if(this.utilsService.isDevelopment()) console.log(error); }
			);
		} else {
			this.searching = false;
			this.tmdbService.getUpcoming(this.language, this.country).subscribe(
				(data) => { this.searchResults = data.results; this.setAdded(); },
				(error) => { if(this.utilsService.isDevelopment()) console.log(error); }
			);
		}
	}

}
