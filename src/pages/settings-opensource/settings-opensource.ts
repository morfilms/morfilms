import { Component } from '@angular/core';
import { Platform, IonicPage, ViewController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()

@Component({
	selector: 'page-settings-opensource',
	templateUrl: 'settings-opensource.html'
})

export class SettingsOpensourcePage {

	constructor(
		private platform: Platform,
		private translate: TranslateService,
		private viewCtrl: ViewController

	) {

		translate.setDefaultLang('en');
	}

	ionViewDidLoad() {
		if (this.platform.is('ios')) this.translate.get('back').subscribe((back) => { this.viewCtrl.setBackButtonText(back); });
	}

}
