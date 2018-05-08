import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { Deeplinks } from '@ionic-native/deeplinks';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Globalization } from '@ionic-native/globalization';
import { TranslateService } from '@ngx-translate/core';

import { DataService } from '../providers/data';
import { TmdbService } from '../providers/tmdb';

import { FilmDetailsPage } from '../pages/film-details/film-details';

import { enableProdMode } from '@angular/core';
enableProdMode();

@Component({
	templateUrl: 'app.html'
})

export class MyApp {
	rootPage: any = 'TabsPage';
	activeTheme: String;

	@ViewChild('navCtrl') navCtrl: NavController;

	constructor(
		private dataService: DataService,
		private deeplinks: Deeplinks,
		private globalization: Globalization,
		private platform: Platform,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar,
		private tmdbService: TmdbService,
		private translate: TranslateService

	) {

		platform.ready().then(() => {

			this.dataService.getActiveTheme().subscribe((theme) => {
				this.activeTheme = theme;
				if(this.activeTheme == 'morfilms-dark-theme' || this.activeTheme == 'blue-velvet-theme') {
					if(this.platform.is('cordova')) this.statusBar.styleLightContent();
				} else {
					if(this.platform.is('cordova')) this.statusBar.styleDefault();
				}
			});

			this.dataService.getStorageTheme().subscribe((storageTheme) => {
				if (storageTheme) this.dataService.setTheme(storageTheme);
				else this.dataService.setTheme('morfilms-light-theme');

				if (this.platform.is('cordova')) {
					if (platform.is('ios')) {
						this.splashScreen.hide();
					} else if (platform.is('android')) {
						setTimeout(() => {
							this.splashScreen.hide();
						}, 400);
					}
				}
			});

			if (!localStorage.getItem('v1.0')) {
				localStorage.setItem('v1.0', 'init');

				this.globalization.getLocaleName()
					.then(
					(language) => {
						var locale = language.value.split('-');
						this.dataService.setCountry(locale[1]).subscribe();
						this.dataService.setLanguage(locale[0]).subscribe(() => { this.translate.use(locale[0]); });
					})
					.catch(
					() => {
						console.log('Globalization: Error getPreferredLanguage()')
						this.dataService.setCountry('US').subscribe();
						this.dataService.setLanguage('en').subscribe(() => { this.translate.use('en'); });
					});

				this.dataService.setAutoRefresh(10).subscribe();
				this.dataService.setNotify(true).subscribe();
				this.dataService.setNotifyDaysBefore('0').subscribe();
				this.dataService.setNotifyTime('09:00').subscribe();

				this.dataService.setDisableAds(false).subscribe();
			} else {
				this.dataService.getLanguage()
					.subscribe((language) => {
						this.translate.use(language);
					});
			}

		});
	}

	ngAfterViewInit() {
		this.platform.ready().then(() => {
			if (this.platform.is('cordova')) {

				//MORFILMS URI
				this.deeplinks.route({
					'/film/:deeplinkFilm': FilmDetailsPage
				}).subscribe((match) => {
					this.dataService.getLanguage().subscribe((language) => {
						this.dataService.getCountry().subscribe((country) => {
							this.tmdbService.getFilmDetails(match.$args.deeplinkFilm, language).subscribe(
								(data) => { this.navCtrl.push(FilmDetailsPage, { film: data, country: country, noaverage: true }); }
							);
						});
					});
				});

				//HTTPS URL
				this.deeplinks.route({
					'/movie/': FilmDetailsPage
				}).subscribe((match) => {
					this.dataService.getLanguage().subscribe((language) => {
						this.dataService.getCountry().subscribe((country) => {
							this.tmdbService.getFilmDetails(match.$args.m, language).subscribe(
								(data) => { this.navCtrl.push(FilmDetailsPage, { film: data, country: country, noaverage: true }); }
							);
						});
					});
				});

			}
		});
	}

}
