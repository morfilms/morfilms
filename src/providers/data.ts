import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/Rx';

import { NotificationsService } from './notifications';
import { TmdbService } from './tmdb';
import { UtilsService } from './utils';

@Injectable()
export class DataService {

	// MAIN
	list: Array<any>;

	// CACHES
	cacheInTheaters: Array<any>;

	// IMTERNAL PROPERTIES
	autoRefresh: Number;

	// SETTINGS - LOCALIZATION
	country: String;
	language: String;

	// SETTINGS - NOTIFICATION
	notify: Boolean;
	notifyDaysBefore: String;
	notifyTime: String;

	// SETTINGS - PREMIUM
	disableAds: Boolean;
	premiumUnlocked: Boolean;
	theme: BehaviorSubject<String> = new BehaviorSubject<String>('');

	constructor(
		private notificationsService: NotificationsService,
		private storage: Storage,
		private tmdbService: TmdbService,
		private utilsService: UtilsService

	) { }

	// GETTERS & SETTERS

	getList() {
		return Observable.create((observer) => {
			if (this.list) {
				observer.next(this.list);
				observer.complete();
			} else {
				this.storage.get('list')
					.then((list) => {
						this.list = JSON.parse(list);
						observer.next(this.list);
						observer.complete();
					});
			}
		});
	}

	setList(list) {
		return Observable.create((observer) => {
			this.list = list;
			this.storage.set('list', JSON.stringify(list))
				.then(() => { observer.next(); observer.complete(); });
		});
	}

	getCacheInTheaters() {
		return Observable.create((observer) => {
			if (this.cacheInTheaters) {
				observer.next(this.cacheInTheaters);
				observer.complete();
			} else {
				this.storage.get('cache.intheaters')
					.then((cacheInTheaters) => {
						this.cacheInTheaters = JSON.parse(cacheInTheaters);
						observer.next(this.cacheInTheaters);
						observer.complete();
					});
			}
		});
	}

	setCacheInTheaters(cacheInTheaters) {
		return Observable.create((observer) => {
			this.cacheInTheaters = cacheInTheaters;
			this.storage.set('cache.intheaters', JSON.stringify(cacheInTheaters))
				.then(() => { observer.next(); observer.complete(); });
		});
	}

	getAutoRefresh() {
		return Observable.create((observer) => {
			if (this.autoRefresh) {
				observer.next(this.autoRefresh);
				observer.complete();
			} else {
				this.storage.get('auto-refresh')
					.then((autoRefresh) => {
						this.autoRefresh = autoRefresh;
						observer.next(this.autoRefresh);
						observer.complete();
					});
			}
		});
	}

	setAutoRefresh(autoRefresh) {
		return Observable.create((observer) => {
			this.autoRefresh = autoRefresh;
			this.storage.set('auto-refresh', autoRefresh)
				.then(() => { observer.next(); observer.complete(); });
		});
	}

	getCountry() {
		return Observable.create((observer) => {
			if (this.country) {
				observer.next(this.country);
				observer.complete();
			} else {
				this.storage.get('settings.country')
					.then((country) => {
						this.country = country;
						observer.next(this.country);
						observer.complete();
					});
			}
		});
	}

	setCountry(country) {
		return Observable.create((observer) => {
			this.country = country;
			this.storage.set('settings.country', country)
				.then(() => { observer.next(); observer.complete(); });
		});
	}

	getLanguage() {
		return Observable.create((observer) => {
			if (this.language) {
				observer.next(this.language);
				observer.complete();
			} else {
				this.storage.get('settings.language')
					.then((language) => {
						this.language = language;
						observer.next(this.language);
						observer.complete();
					});
			}
		});
	}

	setLanguage(language) {
		return Observable.create((observer) => {
			this.language = language;
			this.storage.set('settings.language', language)
				.then(() => { observer.next(); observer.complete(); });
		});
	}

	getNotify() {
		return Observable.create((observer) => {
			if (this.notify) {
				observer.next(this.notify);
				observer.complete();
			} else {
				this.storage.get('settings.notify')
					.then((notify) => {
						this.notify = notify;
						observer.next(this.notify);
						observer.complete();
					});
			}
		});
	}

	setNotify(notify) {
		return Observable.create((observer) => {
			this.notify = notify;
			this.storage.set('settings.notify', notify)
				.then(() => { observer.next(); observer.complete(); });
		});
	}

	getNotifyDaysBefore() {
		return Observable.create((observer) => {
			if (this.notifyDaysBefore) {
				observer.next(this.notifyDaysBefore);
				observer.complete();
			} else {
				this.storage.get('settings.notifyDaysBefore')
					.then((notifyDaysBefore) => {
						this.notifyDaysBefore = notifyDaysBefore;
						observer.next(this.notifyDaysBefore);
						observer.complete();
					});
			}
		});
	}

	setNotifyDaysBefore(notifyDaysBefore) {
		return Observable.create((observer) => {
			this.notifyDaysBefore = notifyDaysBefore;
			this.storage.set('settings.notifyDaysBefore', notifyDaysBefore)
				.then(() => { observer.next(); observer.complete(); });
		});
	}

	getNotifyTime() {
		return Observable.create((observer) => {
			if (this.notifyTime) {
				observer.next(this.notifyTime);
				observer.complete();
			} else {
				this.storage.get('settings.notifyTime')
					.then((notifyTime) => {
						this.notifyTime = notifyTime;
						observer.next(this.notifyTime);
						observer.complete();
					});
			}
		});
	}

	setNotifyTime(notifyTime) {
		return Observable.create((observer) => {
			this.notifyTime = notifyTime;
			this.storage.set('settings.notifyTime', notifyTime)
				.then(() => { observer.next(); observer.complete(); });
		});
	}

	getDisableAds() {
		return Observable.create((observer) => {
			if (this.disableAds) {
				observer.next(this.disableAds);
				observer.complete();
			} else {
				this.storage.get('settings.disableAds')
					.then((disableAds) => {
						this.disableAds = disableAds;
						observer.next(this.disableAds);
						observer.complete();
					});
			}
		});
	}

	setDisableAds(disableAds) {
		return Observable.create((observer) => {
			this.disableAds = disableAds;
			this.storage.set('settings.disableAds', disableAds)
				.then(() => { observer.next(); observer.complete(); });
		});
	}

	getPremiumUnlocked() {
		return Observable.create((observer) => {
			if (this.premiumUnlocked) {
				observer.next(this.premiumUnlocked);
				observer.complete();
			} else {
				this.storage.get('settings.premiumUnlocked')
					.then((premiumUnlocked) => {
						this.premiumUnlocked = premiumUnlocked;
						observer.next(this.premiumUnlocked);
						observer.complete();
					});
			}
		});
	}

	setPremiumUnlocked(premiumUnlocked) {
		return Observable.create((observer) => {
			this.premiumUnlocked = premiumUnlocked;
			this.storage.set('settings.premiumUnlocked', premiumUnlocked)
				.then(() => { observer.next(); observer.complete(); });
		});
	}

	getStorageTheme() {
		return Observable.create((observer) => {
			this.storage.get('settings.theme')
				.then((theme) => {
					observer.next(theme);
					observer.complete();
				});
		});
	}

	getActiveTheme() {
		return this.theme.asObservable();
	}

	setTheme(theme) {
		this.storage.set('settings.theme', theme);
		this.theme.next(theme);
	}

	//LIST OPERATIONS

	addFilm(film) {
		return Observable.create((observer) => {
			this.getList().subscribe((list) => {
				this.setList(this.utilsService.arrayUnique(list.concat(film)))
					.subscribe(() => {
						this.notificationsService.scheduleByID(film);
						observer.next();
						observer.complete();
					});
			});
		});
	}

	addFilmByID(tmdbID) {
		return Observable.create((observer) => {
			this.getLanguage()
				.subscribe((language) => {
					this.tmdbService.getFilmDetails(tmdbID, language)
						.subscribe((film) => {
							this.addFilm(film)
								.subscribe(() => {
									observer.next();
									observer.complete();
								});
						});
				});
		});
	}

	removeFilm(film) {
		return Observable.create((observer) => {
			this.getList()
				.subscribe((list) => {
					for (var i = 0; i < list.length; i++)
						if (list[i].id == film.id) {
							list.splice(i, 1);
							this.setList(list)
								.subscribe(() => {
									this.notificationsService.cancel(film);
									observer.next();
									observer.complete();
								});

							break;
						}
				});
		});
	}

	refreshFilm(film) {
		return Observable.create((observer) => {
			this.getLanguage().subscribe((language) => {
				this.getList().subscribe((list) => {
					this.tmdbService.getFilmDetails(film.id, language).subscribe(
						(data) => {
							for (var i = 0; i < list.length; i++) {
								if (list[i].id == film.id) {
									list[i] = data;
									this.setList(list).subscribe(() => {
										this.notificationsService.cancel(data);
										this.notificationsService.scheduleByID(data);
										observer.next();
										observer.complete();
									});
									break;
								}
							}
						},
						(error) => { if(this.utilsService.isDevelopment()) console.log(error); }
					);
				});
			});
		});
	}

	autoRefreshFilms() {
		return Observable.create((observer) => {
			this.getAutoRefresh().subscribe((autoRefresh) => {
				this.getList().subscribe((list) => {
					var reset = false;
					if (list == null) this.setList(new Array()).subscribe();

					for (var i = autoRefresh - 10; i < autoRefresh; i++) {
						if (i >= list.length) { reset = true; break; }
						this.refreshFilm(list[i]).subscribe(() => { observer.next(); });
					}

					this.setAutoRefresh(reset ? 10 : autoRefresh + 10).subscribe();
				});
			});
		});
	}
}
