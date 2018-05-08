import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { SettingsOpensourcePage } from './settings-opensource';

@NgModule({
	declarations: [
		SettingsOpensourcePage,
	],
	imports: [
		IonicPageModule.forChild(SettingsOpensourcePage),
		TranslateModule
	],
	exports: [
		SettingsOpensourcePage
	]
})

export class SettingsOpensourcePageModule { }