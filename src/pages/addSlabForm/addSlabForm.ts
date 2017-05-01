import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { AuthService } from '../../providers/auth-service';
import { Slab } from '../../providers/slab.model';

@Component({
  selector: 'page-addSlabForm',
  templateUrl: 'addSlabForm.html'
})
export class AddSlabForm {
  items: FirebaseListObservable<any[]>;
  slab = {};
  
  constructor(public navCtrl: NavController,af: AngularFire,private _auth: AuthService) {
    this.items = af.database.list('/slabs');
  }

  signInWithFacebook(): void {
    this._auth.signInWithFacebook()
      .then(() => this.onSignInSuccess());
  }

  private onSignInSuccess(): void {
    console.log("Facebook display name ",this._auth.displayName());
  }

    addSlab(slab: any) {
      slab.voteCount = 0;
      this.items.push(slab.value);
     //console.log(slab.value);
  }

}
