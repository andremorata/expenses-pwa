import { Injectable } from '@angular/core';
import { SysVariables } from './utils.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {
  constructor(public http: Http) { }

  loadConfigurationFile() {
    return this.http.get('/appSettings.json')
      .map((res: Response) => res.json());
  }

}
