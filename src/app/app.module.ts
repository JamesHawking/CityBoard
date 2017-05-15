import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AngularFireModule } from 'angularfire2';

import { PostModule } from '../pages/post/post.module';

import { AddSlabForm } from '../pages/addSlabForm/addSlabForm';
import { MapPage } from '../pages/map/map';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { PostService } from './post/post.service';
import { AuthService } from '../providers/auth-service';

 import { GoogleMaps } from '@ionic-native/google-maps';
 import { Geolocation } from '@ionic-native/geolocation';

 import { CustomIconsModule } from 'ionic2-custom-icons';
import { PopOverControlls } from '../pages/pop-over-controlls/pop-over-controlls';

export const firebaseConfig = {
  apiKey: "AIzaSyCYSOZSBgcFZQLkEm9YwgJCcBu2nV61fKM",
  authDomain: "cityboard-31d6b.firebaseapp.com",
  databaseURL: "https://cityboard-31d6b.firebaseio.com",
  storageBucket: "cityboard-31d6b.appspot.com",
  messagingSenderId: '226647131573'
};

@NgModule({
  declarations: [
    MyApp,
    AddSlabForm,
    MapPage,
    HomePage,
    TabsPage,
    PopOverControlls
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    CustomIconsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    PostModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AddSlabForm,
    MapPage,
    HomePage,
    TabsPage,
    PopOverControlls
  ],
  providers: [
    StatusBar,
    PostService,
    AuthService,
    GoogleMaps,
    Geolocation,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
