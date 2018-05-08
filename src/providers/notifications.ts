import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { TranslateService } from '@ngx-translate/core';

//USING STORAGE BECAUSE OF CIRCULAR DEPENDENCIES
import { Storage } from '@ionic/storage';

import { UtilsService} from './utils';

@Injectable()
export class NotificationsService {

	constructor(
		private platform: Platform,
		private storage: Storage,
		private localNotifications: LocalNotifications,
		private translate: TranslateService,
		private utilsService: UtilsService

	) { }

	scheduleByID(film) {
		if (this.platform.is('cordova')) {
			this.storage.get('settings.notify').then((notify) => {
				if (!notify) return;
				this.storage.get('settings.notifyDaysBefore').then((notifyDaysBefore) => {
					this.storage.get('settings.notifyTime').then((notifyTime) => {
						this.storage.get('settings.country').then((country) => {
							this.schedule(film, notifyDaysBefore, notifyTime, country);
						});
					});
				});
			});
		}
	}

	settingsChangeScheduleAll(notify, daysBefore, time, country) {
		if (this.platform.is('cordova')) {
			this.cancelAll();
			if (!notify) return;
			this.storage.get('list').then((list) => {
				var listJSON = JSON.parse(list);
				for (var i = 0; i < listJSON.length; i++)
					this.schedule(listJSON[i], daysBefore, time, country);
			});
		}
	}

	schedule(film, daysBefore, time, country) {
		if (this.platform.is('cordova')) {
			this.localNotifications.isScheduled(film.id).then((scheduled) => {
				if (!scheduled) {
					for (var j = 0; j < film.release_dates.results.length; j++)
						if (film.release_dates.results[j].iso_3166_1 == country)
							for (var k = 0; k < film.release_dates.results[j].release_dates.length; k++)
								if (film.release_dates.results[j].release_dates[k].type == 3) {

									var release = new Date(film.release_dates.results[j].release_dates[k].release_date);
									release.setDate(release.getDate() - daysBefore);
									release.setHours(parseInt(time.split(':')[0]), parseInt(time.split(':')[1]), 0, 0);
									if (release < new Date()) return;

									// DEBUG
									// release = new Date();
									// release.setSeconds(release.getSeconds() + 10);

									if (daysBefore == 0)
										this.translate.get('notification_today').subscribe((notification_today) => {
											this.localNotifications.schedule({
												id: film.id,
												text: notification_today.replace("$1", film.title),
												at: release,
												sound: null
											});
										});
									else if (daysBefore == 1)
										this.translate.get('notification_tomorrow').subscribe((notification_today) => {
											this.localNotifications.schedule({
												id: film.id,
												text: notification_today.replace("$1", film.title),
												at: release,
												sound: null
											});
										});
									else
										this.translate.get('notification_days').subscribe((notification_days) => {
											this.localNotifications.schedule({
												id: film.id,
												text: notification_days.replace("$1", film.title).replace("$2", daysBefore),
												at: release,
												sound: null
											});
										});

									break;
								}
				}
			}).catch(() => { if(this.utilsService.isDevelopment()) console.log('this.localNotifications is not available.'); });
		}
	}

	cancel(film) {
		if (this.platform.is('cordova'))
			this.localNotifications.cancel(film.id);
	}

	cancelAll() {
		if (this.platform.is('cordova'))
			this.localNotifications.cancelAll();
	}

}
