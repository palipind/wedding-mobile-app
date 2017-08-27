import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";

var LOCALHOST = '192.168.0.21';

@Injectable()
export class WeddingEventApi {
	constructor(
		public http:Http
		) {}

	loadEvents(weddingId): Observable<any> {
		let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });
		var url = "http://" +LOCALHOST+ ":8080/weddingApi/rest/weddingEvent/query/weddingId/"+weddingId;
		var response = this.http.get(url, options).map(res => res.json());
        return response;
	}
}