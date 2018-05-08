import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { FilmItemComponentModule } from '../../components/film-item/film-item.module';
import { PersonDetailsPage } from './person-details';

@NgModule({
	declarations: [
		PersonDetailsPage,
	],
	imports: [
		IonicPageModule.forChild(PersonDetailsPage),
		FilmItemComponentModule,
		TranslateModule
	],
	exports: [
		PersonDetailsPage
	]
})

export class PersonDetailsPageModule { }
