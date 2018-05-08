import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { FilmItemComponentModule } from '../../components/film-item/film-item.module';
import { PersonItemComponentModule } from '../../components/person-item/person-item.module';
import { SearchPage } from './search';

@NgModule({
	declarations: [
		SearchPage,
	],
	imports: [
		IonicPageModule.forChild(SearchPage),
		FilmItemComponentModule,
		PersonItemComponentModule,
		TranslateModule
	],
	exports: [
		SearchPage
	]
})

export class SearchPageModule { }
