import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { FilmCardComponentModule } from '../../components/film-card/film-card.module';
import { InTheatersPage } from './in-theaters';

@NgModule({
	declarations: [
		InTheatersPage,
	],
	imports: [
		IonicPageModule.forChild(InTheatersPage),
		TranslateModule,
		FilmCardComponentModule
	],
	exports: [
		InTheatersPage
	]
})

export class InTheatersPageModule { }
