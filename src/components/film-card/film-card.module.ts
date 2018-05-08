import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { FilmCardComponent } from './film-card';

@NgModule({
	declarations: [
		FilmCardComponent,
	],
	imports: [
		IonicModule,
		TranslateModule
	],
	exports: [
		FilmCardComponent
	]
})

export class FilmCardComponentModule { }
