import { Component, Input } from '@angular/core';

@Component({
	selector: 'film-card',
	templateUrl: 'film-card.html'
})

export class FilmCardComponent {

	@Input('film') film: any;

	constructor() { }

	getBackdrop(film) {
		return 'url(https://image.tmdb.org/t/p/w1280' + (film.backdrop_path ? film.backdrop_path : film.poster_path) + ')';
	}
}
