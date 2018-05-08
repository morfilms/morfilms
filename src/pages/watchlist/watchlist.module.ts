import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { FilmCardComponentModule } from '../../components/film-card/film-card.module';
import { WatchlistPage } from './watchlist';

@NgModule({
	declarations: [
		WatchlistPage
	],
	imports: [
		IonicPageModule.forChild(WatchlistPage),
		TranslateModule,
		FilmCardComponentModule
	],
	exports: [
		WatchlistPage
	]
})

export class WatchlistPageModule { }
