import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";

var LOCALHOST = '192.168.0.21';

@Injectable()
export class DeviceTokenApi {
	constructor(public http: Http) {}

  	registerToken(weddingId, token): Observable<any> {
  		let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });
		  var args = {"deviceToken": token, "weddingId": weddingId};
		  var url = "http://" +LOCALHOST+ ":8080/weddingApi/rest/deviceToken/add";
		  var response = this.http.post(url, args, options).map(res => res.json());
        return response;
   	}

  	deleteToken(token): Observable<any> {
    	let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
    	var args = {"deviceToken": token};
    	var url = "http://" +LOCALHOST+ ":8080/weddingApi/rest/deviceToken/delete";
    	var response = this.http.post(url, args, options).map(res => res.json());
        return response;
  	}
}
