import { Component } from '@angular/core';
import { Platform, NavController, NavParams, ViewController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { DataService } from '../../providers/data';
import { NavigationService } from '../../providers/navigation';
import { SharingService } from '../../providers/sharing';
import { TmdbService } from '../../providers/tmdb';
import { UtilsService } from '../../providers/utils';

import * as ProgressBar from 'progressbar.js';
import * as moment from 'moment';
import 'moment-duration-format';
import 'moment/locale/es';

@Component({
	selector: 'page-film-details',
	templateUrl: 'film-details.html'
})

export class FilmDetailsPage {

	film: any;
	country: String;
	noaverage: Boolean;

	constructor(
		private dataService: DataService,
		private navCtrl: NavController,
		private navigation: NavigationService,
		private params: NavParams,
		private platform: Platform,
		private sharingService: SharingService,
		private tmdbService: TmdbService,
		private translate: TranslateService,
		private utilsService: UtilsService,
		private viewCtrl: ViewController

	) {

		translate.setDefaultLang('en');

		this.film = this.params.get("film");
		this.country = this.params.get("country");
		this.noaverage = this.params.get("noaverage");

		this.film.added = false;
		this.dataService.getList()
			.subscribe((list) => {
				for (var i = 0; i < list.length; i++)
					if (this.film.id == list[i].id) {
						this.film.added = true;
						break;
					}
			});

		moment.locale(this.country.toLowerCase() != 'us' ? 'es' : 'en');
	}

	ionViewDidLoad() {

		if (this.platform.is('ios')) this.translate.get('back').subscribe((back) => { this.viewCtrl.setBackButtonText(back); });

		if ((this.film.backdrop_path || this.film.poster_path) && this.film.vote_average && !this.noaverage) {
			var vote_average = new ProgressBar.Circle('.show-tab #' + this.getVoteID(), {
				color: 'white',
				easing: 'easeInOut',
				duration: 600,
				strokeWidth: 11,
				text: {
					className: 'vote-average-text',
					autoStyleContainer: false
				},
				from: { color: '#d8431a' },
				to: { color: '#1ad843' },
				step: function(state, circle) {
					circle.path.setAttribute('stroke', state.color);
					circle.setText((circle.value() * 10).toFixed(1));
				}
			});

			vote_average.set(this.film.vote_average / 10);
		}
	}

	showCast() {
		this.navCtrl.push('PersonListPage', { title: 'all_cast', people: this.film.credits.cast });
	}

	showCrew() {
		this.navCtrl.push('PersonListPage', { title: 'all_crew', people: this.film.credits.crew });
	}

	getVoteID() {
		return 'vote-average' + this.viewCtrl.index;
	}

	showPersonDetails(person) {
		var requestTimestamp = this.navigation.setTimestamp();
		this.dataService.getLanguage()
			.subscribe((language) => {
				this.tmdbService.getPersonDetails(person.id, language).subscribe(
					(data) => { this.navigation.push(this.navCtrl, requestTimestamp, 'PersonDetailsPage', { person: data }); },
					(error) => { if(this.utilsService.isDevelopment()) console.log(error); }
				);
			});
	}

	getBackdrop() {
		return 'url(https://image.tmdb.org/t/p/w1280' + (this.film.backdrop_path ? this.film.backdrop_path : this.film.poster_path) + ')';
	}

	getTrailer() {
		for (var i = 0; i < this.film.videos.results.length; i++)
			if (this.film.videos.results[i].type == 'Trailer' && this.film.videos.results[i].site == 'YouTube')
				return this.film.videos.results[i].key;

		return null;
	}

	getRuntime() {
		if (this.film.runtime < 1) return null;

		const duration = moment.duration(this.film.runtime, 'minutes') as Duration;
		return duration.format("h[h] m[min]");
	}

	getReleaseDate() {
		var releaseDate = this.utilsService.getReleaseDateByCountry(this.film, this.country);
		if (releaseDate) return moment(releaseDate).format('L');
		else return null;
	}

	getGenres() {
		var genres = new Array();
		for (var i = 0; i < this.film.genres.length; i++) {
			if (this.film.genres[i].name == 'Science Fiction')
				genres.push('Sci-Fi');
			else
				genres.push(this.film.genres[i].name);

			// we get max 2 genres
			if (i == 1) break;
		}

		return genres;
	}

	getDirector() {
		var directors = new Array();
		for (var i = 0; i < this.film.credits.crew.length; i++)
			if (this.film.credits.crew[i].job == 'Director') {
				directors.push(this.film.credits.crew[i]);
				if (directors.length == 2) break;
			}

		return directors;
	}

	getCast() {
		var cast = new Array();
		for (var i = 0; i < this.film.credits.cast.length; i++) {
			cast.push(this.film.credits.cast[i]);

			// we get max 5 acting roles
			if (i == 4) break;
		}

		return cast;
	}

	share() {
		this.dataService.getLanguage()
			.subscribe((language) => {
				this.sharingService.shareFilm(this.film);
			});
	}

	removeFilm() {
		this.dataService.removeFilm(this.film)
			.subscribe(() => {
				this.film.added = false;
			});
	}

	addFilm() {
		this.dataService.addFilm(this.film)
			.subscribe(() => {
				this.film.added = true;
			});
	}
}

interface Duration extends moment.Duration {
	format: (template?: string, precision?: number, settings?: DurationSettings) => string;
}

interface DurationSettings {
	forceLength: boolean;
	precision: number;
	template: string;
	trim: boolean | 'left' | 'right';
}
