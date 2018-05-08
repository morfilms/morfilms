import { Injectable } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing';

import { DataService } from './data';

@Injectable()
export class SharingService {

	constructor(
		private dataService: DataService,
		private socialSharing: SocialSharing

	) {}

	shareFilm(film) {
		this.dataService.getLanguage().subscribe((language) => {
			this.dataService.getCountry().subscribe((country) => {
				this.socialSharing.share(
					film.title,
					film.title,
					'https://image.tmdb.org/t/p/w780' + (film.poster_path ? film.poster_path : film.backdrop_path),
					'https://morfilms.link/movie/?l=' + language + '&c=' + country + '&m=' + film.id
				);
			});
		});
	}

	shareFilmWithMessage(film, message) {
		this.dataService.getLanguage().subscribe((language) => {
			this.dataService.getCountry().subscribe((country) => {
				this.socialSharing.share(
					message,
					message,
					'https://image.tmdb.org/t/p/w780' + (film.poster_path ? film.poster_path : film.backdrop_path),
					'https://morfilms.link/movie/?l=' + language + '&c=' + country + '&m=' + film.id
				);
			});
		});
	}
}
