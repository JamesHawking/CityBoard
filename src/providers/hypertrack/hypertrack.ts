import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

/*
  Generated class for the HypertrackProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class HypertrackProvider {
  private headers = new Headers({ 'Authorization': 'token sk_0e9b9db0740e124df46494b256849cb9ab3b8ca0', 'Content-Type': 'application/json' });
  private heroesUrl = 'https://api.hypertrack.com/api/v1/users/';  // URL to web api 
  private eventsUrl = 'https://app.hypertrack.io/api/v1/events/'
  private placesUrl = 'https://app.hypertrack.io/api/v1/places/'
  constructor(public http: Http) {
    
  }

  getUsers(): Observable<any> {
    return this.http.get(this.heroesUrl, {headers: this.headers})
      .map(this.handleUsers)
      .catch(this.handleError);
  }

  getEvents(): Observable<any> {
    return this.http.get(this.eventsUrl, {headers: this.headers})
      .map(this.handleEvents)
      .catch(this.handleError);
  }

  createPlace() {
//TODO
  }

  getPlaces(): Observable<any> {
    return this.http.get(this.placesUrl, {headers: this.headers})
      .map(this.handleEvents)
      .catch(this.handleError);
  }
  
  private handlePlaces(res: any) {
    let body = res.json();
    let data = body.results;
    console.log(body);
    return data || {};
  }

  private handleEvents(res: any) {
    let body = res.json();
    let data = body.results;
    console.log(body);
    return data || {};
  }

  private handleUsers(res: any) {
    let body = res.json();
    let data = body.results;
    console.log(body.results);
    return data || {};
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
  }

}
