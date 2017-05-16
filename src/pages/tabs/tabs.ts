import { Component } from '@angular/core';

import { AddSlabForm } from '../addSlabForm/addSlabForm';
import { MapPage } from '../map/map';
import { HomePage } from '../home/home';
import { PostPage } from '../post/post';
import { LoginPage } from '../login/login';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;

  tab2Root = AddSlabForm;
  tab3Root = MapPage;
  tab4Root = PostPage;
  tab5Root = LoginPage;

  constructor() {

  }
}
