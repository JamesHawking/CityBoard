import { Component } from '@angular/core';

import { AddSlabForm } from '../addSlabForm/addSlabForm';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { PostPage } from '../post/post';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AddSlabForm;
  tab3Root = ContactPage;
  tab4Root = PostPage;

  constructor() {

  }
}
