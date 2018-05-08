import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class TmdbService {

	API_KEY: String = "API_KEY";

	static get parameters() {
		return [[Http]];
	}

	constructor(
		private http: Http

	) { }

	isValidCache(cache, language, region) {
		return cache.language == language && cache.region == region && cache.date == new Date().toJSON().split('T')[0];
	}

	getUpcoming(language, region) {
		var url = 'http://api.themoviedb.org/3/movie/upcoming?api_key=' + this.API_KEY + '&region=' + encodeURI(region) + '&language=' + language;
		console.log('GET - ' + url);
		var response = this.http.get(url)
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
		return response;
	}

	getSearch(film, language) {
		var url = 'http://api.themoviedb.org/3/search/multi?api_key=' + this.API_KEY + '&query=' + encodeURI(film) + '&language=' + language;
		console.log('GET - ' + url);
		var response = this.http.get(url)
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
		return response;
	}

	getNewInTheaters(language, region) {
		var today = new Date();
		var start = new Date();
		start.setDate(today.getDate() - 15);
		var url = 'https://api.themoviedb.org/3/discover/movie?api_key=' + this.API_KEY + '&language=' + language + '&region=' + region + '&release_date.gte=' + start.toJSON() + '&release_date.lte=' + today.toJSON() + '&with_release_type=3';
		console.log('GET - ' + url);
		var response = this.http.get(url)
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
		return response;
	}

	getFilmDetails(id, language) {
		var url = 'http://api.themoviedb.org/3/movie/' + encodeURI(id) + '?api_key=' + this.API_KEY + '&append_to_response=release_dates,videos,credits' + '&language=' + language;
		console.log('GET - ' + url);
		var response = this.http.get(url)
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
		return response;
	}

	getPersonDetails(id, language) {
		var url = 'http://api.themoviedb.org/3/person/' + encodeURI(id) + '?api_key=' + this.API_KEY + '&append_to_response=movie_credits' + '&language=' + language;
		console.log('GET - ' + url);
		var response = this.http.get(url)
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
		return response;
	}
}
