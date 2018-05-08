import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AdMobFree } from '@ionic-native/admob-free';
import { Clipboard } from '@ionic-native/clipboard';
import { Deeplinks } from '@ionic-native/deeplinks';
import { Globalization } from '@ionic-native/globalization';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { DataService } from '../providers/data';
import { NavigationService } from '../providers/navigation';
import { NotificationsService } from '../providers/notifications';
import { SharingService } from '../providers/sharing';
import { TmdbService } from '../providers/tmdb';
import { UtilsService } from '../providers/utils';

import { FilmDetailsPage } from '../pages/film-details/film-details';
import { FilmListPage } from '../pages/film-list/film-list';

import { AlphabeticalPipe } from '../pipes/alphabetical';

import { MyApp } from './app.component';

@NgModule({
  declarations: [
    MyApp,
    FilmDetailsPage,
    FilmListPage,
    AlphabeticalPipe
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      platforms: {
        android: {
          tabsPlacement: 'top',
        }
      }
    }),
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FilmDetailsPage
  ],
  providers: [
    AdMobFree,
    Clipboard,
    Deeplinks,
    Globalization,
    LocalNotifications,
    SocialSharing,
    SplashScreen,
    StatusBar,

    { provide: ErrorHandler, useClass: IonicErrorHandler },

    DataService,
    NavigationService,
    NotificationsService,
    SharingService,
    TmdbService,
    UtilsService
  ]
})

export class AppModule { }

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
