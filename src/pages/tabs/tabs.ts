import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()

@Component({
	templateUrl: 'tabs.html'
})
export class TabsPage {
	tabSearch: any = 'SearchPage';
	tabTheaters: any = 'InTheatersPage';
	tabUpcoming: any = 'UpcomingPage';
	tabWatchlist: any = 'WatchlistPage';

	constructor() { }

}
