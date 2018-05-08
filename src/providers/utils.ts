import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {

  	constructor() { }

  	isDevelopment(): Boolean {
  		return true;
  	}

  	arrayUnique(array) {
		var a = array.concat();
		for (var i = 0; i < a.length; ++i)
			for (var j = i + 1; j < a.length; ++j)
				if (a[i].id === a[j].id)
					a.splice(j--, 1);

		return a;
	}

	sleep(milliseconds) {
		var start = new Date().getTime();
		for (var i = 0; i < 1e7; i++) {
			if ((new Date().getTime() - start) > milliseconds) {
				break;
			}
		}
	}

	getReleaseDateByCountry(film, country) {
		var releaseDate = null;

		for (var i = 0; i < film.release_dates.results.length; i++)
			if (film.release_dates.results[i].iso_3166_1 == country)
				for (var j = 0; j < film.release_dates.results[i].release_dates.length; j++)
					if (film.release_dates.results[i].release_dates[j].type == 3) {
						releaseDate = new Date(film.release_dates.results[i].release_dates[j].release_date);
						break;
					}

		if (releaseDate) return releaseDate.toJSON().split('T')[0];
		else if (film.release_date) return film.release_date;
		else return null;
	}

}
