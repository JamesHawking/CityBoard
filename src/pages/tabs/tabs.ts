import { Component } from '@angular/core';

import { AddSlabForm } from '../addSlabForm/addSlabForm';
import { MapPage } from '../map/map';
import { HomePage } from '../home/home';
import { PostPage } from '../post/post';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AddSlabForm;
  tab3Root = MapPage;
  tab4Root = PostPage;

  constructor() {

  }
}
