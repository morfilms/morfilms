import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { DataService } from '../../providers/data';
import { NavigationService } from '../../providers/navigation';
import { TmdbService } from '../../providers/tmdb';
import { UtilsService } from '../../providers/utils';

@IonicPage()

@Component({
	selector: 'page-person-list',
	templateUrl: 'person-list.html'
})

export class PersonListPage {

	title: String;
	people: any;

	constructor(
		private dataService: DataService,
		private navCtrl: NavController,
		private navigation: NavigationService,
		private params: NavParams,
		private platform: Platform,
		private tmdbService: TmdbService,
		private translate: TranslateService,
		private utilsService: UtilsService,
		private viewCtrl: ViewController

	) {

		translate.setDefaultLang('en');

		this.title = this.params.get("title");
		this.people = JSON.parse(JSON.stringify(this.params.get("people")));
		this.people = this.mergeJobs(this.people);
	}

	ionViewDidLoad() {
		if (this.platform.is('ios')) this.translate.get('back').subscribe((back) => { this.viewCtrl.setBackButtonText(back); });
	}

	showPersonDetails(event, person) {
		var requestTimestamp = this.navigation.setTimestamp();
		this.dataService.getLanguage().subscribe((language) => {
			this.tmdbService.getPersonDetails(person.id, language).subscribe(
				(data) => { this.navigation.push(this.navCtrl, requestTimestamp, 'PersonDetailsPage', { person: data }); },
				(error) => { if(this.utilsService.isDevelopment()) console.log(error); }
			);
		});
	}

	mergeJobs(array) {
		for (var i = 0; i < array.length; ++i)
			for (var j = i + 1; j < array.length; ++j)
				if (array[i].id === array[j].id) {
					if (array[j].job == 'Director') array[i].job = array[j].job + ' / ' + array[i].job;
					else array[i].job = array[i].job + ' / ' + array[j].job;
					array.splice(j--, 1);
				}

		return array;
	}
}
