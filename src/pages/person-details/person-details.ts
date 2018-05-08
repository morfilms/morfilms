import { Component } from '@angular/core';
import { Platform, IonicPage, NavParams, ViewController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { DataService } from '../../providers/data';

@IonicPage()

@Component({
	selector: 'page-person-details',
	templateUrl: 'person-details.html'
})

export class PersonDetailsPage {

	person: any;
	films: Array<any>;

	constructor(
		private dataService: DataService,
		private params: NavParams,
		private platform: Platform,
		private translate: TranslateService,
		private viewCtrl: ViewController

	) {

		translate.setDefaultLang('en');

		this.person = this.params.data.person;
		this.films = this.getFilmList();
	}

	ionViewDidLoad() {
		if (this.platform.is('ios')) this.translate.get('back').subscribe((back) => { this.viewCtrl.setBackButtonText(back); });
	}

	ionViewWillEnter() {
		this.setAdded()
	}

	getFilmList() {
		var array = new Array();

		for (var j = 0; j < this.person.movie_credits.cast.length; j++)
			this.person.movie_credits.cast[j].job = 'Actor';

		array = array.concat(this.person.movie_credits.crew);
		array = array.concat(this.person.movie_credits.cast);

		array = this.mergeJobs(array);

		return this.orderByDate(array);
	}

	mergeJobs(array) {
		for (var i = 0; i < array.length; i++)
			if (array[i].job == 'Thanks' || array[i].character == 'Himself' || array[i].character == 'himself' || array[i].character == ''
				|| array[i].character == 'Himself (Archival)' || array[i].character == this.person.name) array.splice(i--, 1);

		for (i = 0; i < array.length; ++i)
			for (var j = i + 1; j < array.length; ++j)
				if (array[i].id === array[j].id) {
					if (array[j].job == 'Director') array[i].job = array[j].job + ' / ' + array[i].job;
					else array[i].job = array[i].job + ' / ' + array[j].job;
					array.splice(j--, 1);
				}

		return array;
	}

	orderByDate(array) {
		return array.sort(function(a, b) {
			var date1 = new Date(a.release_date);
			var date2 = new Date(b.release_date);
			return date1 > date2 ? -1 : date1 < date2 ? 1 : 0;
		});
	}

	setAdded() {
		this.dataService.getList().subscribe((list) => {
			for (var i = 0; i < this.films.length; i++){
				this.films[i].added = false;
				for (var j = 0; j < list.length; j++)
					if (this.films[i].id == list[j].id) {
						this.films[i].added = true;
						continue;
					}
			}
		});
	}
}
