import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { SettingsSyncPage } from './settings-sync';

@NgModule({
	declarations: [
		SettingsSyncPage,
	],
	imports: [
		IonicPageModule.forChild(SettingsSyncPage),
		TranslateModule
	],
	exports: [
		SettingsSyncPage
	]
})

export class SettingsSyncPageModule { }
