import { Component } from '@angular/core';
import { Platform, IonicPage, LoadingController, ViewController, ToastController } from 'ionic-angular';
import { Clipboard } from '@ionic-native/clipboard';
import { TranslateService } from '@ngx-translate/core';

import { DataService } from '../../providers/data';
import { UtilsService } from '../../providers/utils';

@IonicPage()

@Component({
	selector: 'page-settings-sync',
	templateUrl: 'settings-sync.html'
})

export class SettingsSyncPage {

	constructor(
		private clipboard: Clipboard,
		private dataService: DataService,
		private loadingCtrl: LoadingController,
		private platform: Platform,
		private translate: TranslateService,
		private toastCtrl: ToastController,
		private utilsService: UtilsService,
		private viewCtrl: ViewController

	) {

		this.translate.setDefaultLang('en');
	}

	ionViewDidLoad() {
		if (this.platform.is('ios')) this.translate.get('back').subscribe((back) => { this.viewCtrl.setBackButtonText(back); });
	}

	export() {
		this.dataService.getList().subscribe((list) => {
			var ids = new Array();
			for (var i = 0; i < list.length; i++) {
				ids.push(list[i].id);
			}

			this.clipboard.copy(JSON.stringify(ids)).then(
			   	(resolve: string) => {
			      	this.translate.get('export_success').subscribe((export_success) => {
						let toast = this.toastCtrl.create({
							message: export_success,
							duration: 1500,
							position: 'bottom'
						});
						toast.present();
					});
			    },
			    (reject: string) => {
			      	this.translate.get('error').subscribe((error) => {
						let toast = this.toastCtrl.create({
							message: error,
							duration: 1500,
							position: 'bottom'
						});
						toast.present();
					});
			    }
			);
		});
	}

	import() {
		this.clipboard.paste().then(
		   	(resolve: string) => {
		      	this.translate.get('[import_loading, import_success, error]').subscribe((response) => {

		      		try {

			      		var ids = JSON.parse(resolve);

				   		let loading = this.loadingCtrl.create({
							content: response.import_loading
						});
						loading.present();

				      	for (var i = 0; i < ids.length; i++) {
							this.dataService.addFilmByID(ids[i]).subscribe();
							if (i % 35 == 0) { this.utilsService.sleep(10000); }
						}
						loading.dismiss();

						let toast = this.toastCtrl.create({
							message: response.import_success,
							duration: 1500,
							position: 'bottom'
						});
						toast.present();

					} catch(e) {

					  	console.log("Caught: " + e.message);

					}

				});
		    },
		    (reject: string) => {
		      	this.translate.get('error').subscribe((error) => {
					let toast = this.toastCtrl.create({
						message: error,
						duration: 1500,
						position: 'bottom'
					});
					toast.present();
				});
		    }
		);
	}

}
