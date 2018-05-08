import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DataService } from '../../providers/data';
import { NavigationService } from '../../providers/navigation';
import { TmdbService } from '../../providers/tmdb';

@Component({
	selector: 'person-item',
	templateUrl: 'person-item.html'
})

export class PersonItemComponent {

	@Input('person') person: any;

	constructor(
		private dataService: DataService,
		private navCtrl: NavController,
		private navigation: NavigationService,
		private tmdbService: TmdbService

	) { }

	showPersonDetails() {
		var requestTimestamp = this.navigation.setTimestamp();
		this.dataService.getLanguage()
			.subscribe((language) => {
				this.tmdbService.getPersonDetails(this.person.id, language)
					.subscribe(
						(data) => { this.navigation.push(this.navCtrl, requestTimestamp, 'PersonDetailsPage', { person: data }); },
						(err) => { console.log(err); }
					);
			});
	}
}
