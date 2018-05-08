import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { PersonItemComponentModule } from '../../components/person-item/person-item.module';
import { PersonListPage } from './person-list';

@NgModule({
	declarations: [
		PersonListPage,
	],
	imports: [
		IonicPageModule.forChild(PersonListPage),
		PersonItemComponentModule,
		TranslateModule
	],
	exports: [
		PersonListPage
	]
})

export class PersonListPageModule { }
