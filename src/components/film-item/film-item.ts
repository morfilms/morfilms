import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DataService } from '../../providers/data';
import { NavigationService } from '../../providers/navigation';
import { TmdbService } from '../../providers/tmdb';

import { FilmDetailsPage } from '../../pages/film-details/film-details';

@Component({
	selector: 'film-item',
	templateUrl: 'film-item.html'
})

export class FilmItemComponent {

	@Input('film') film: any;

	constructor(
		private dataService: DataService,
		private navigation: NavigationService,
		private navCtrl: NavController,
		private tmdbService: TmdbService

	) { }

	showFilmDetails() {
		var requestTimestamp = this.navigation.setTimestamp();
		this.dataService.getLanguage()
			.subscribe((language) => {
				this.dataService.getCountry()
						.subscribe((country) => {
							this.tmdbService.getFilmDetails(this.film.id, language)
								.subscribe(
									(data) => { this.navigation.push(this.navCtrl, requestTimestamp, FilmDetailsPage, { film: data, country: country }); },
									(error) => { console.log(error); }
								);
						});
			});
	}

	addFilm() {
		this.dataService.addFilmByID(this.film.id)
			.subscribe(() => {
				this.film.added = true;
			});
	}

	removeFilm() {
		this.dataService.removeFilm(this.film)
			.subscribe(() => {
				this.film.added = false;
			});
	}

}
