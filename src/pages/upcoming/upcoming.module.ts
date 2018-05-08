import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { FilmCardComponentModule } from '../../components/film-card/film-card.module';
import { UpcomingPage } from './upcoming';

@NgModule({
	declarations: [
		UpcomingPage,
	],
	imports: [
		IonicPageModule.forChild(UpcomingPage),
		FilmCardComponentModule,
		TranslateModule
	],
	exports: [
		UpcomingPage
	]
})

export class UpcomingPageModule { }
