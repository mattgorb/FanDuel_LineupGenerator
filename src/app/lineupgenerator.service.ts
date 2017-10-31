import { Injectable } from '@angular/core';
import { Http, Request, Response, Headers, RequestMethod, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/Rx'

@Injectable()
export class LineupgeneratorService {
    private apiURL = "/lineupgenerator";
    constructor(private http: Http) { }
    generator(value) {
	
        var headers = new Headers();
        headers.append("Content-Type", 'application/json');
	

        var requestoptions = new RequestOptions({
            method: RequestMethod.Post,
            url: this.apiURL,
            headers: headers,
            body:JSON.stringify(value),
            responseType: ResponseContentType.Text
        });

	//console.log(requestoptions.body);
        return this.http.post(this.apiURL,  requestoptions);
           //.then(this.extractData);
    }

    private extractData(res: Response) {
	let body = res;
        //return body.data || {};
    }
}
