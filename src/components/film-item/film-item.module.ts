import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { FilmItemComponent } from './film-item';

@NgModule({
	declarations: [
		FilmItemComponent,
	],
	imports: [
		IonicModule,
	],
	exports: [
		FilmItemComponent
	]
})

export class FilmItemComponentModule { }
