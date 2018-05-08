import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { PersonItemComponent } from './person-item';

@NgModule({
	declarations: [
		PersonItemComponent,
	],
	imports: [
		IonicModule,
	],
	exports: [
		PersonItemComponent
	]
})

export class PersonItemComponentModule { }
