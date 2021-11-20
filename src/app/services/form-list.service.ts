import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Field, FieldList } from '../models/FieldList';
import { HttpClient } from '@angular/common/http';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FormListService {
  private url = 'assets/payloads/form-content.json';
  // tempurl = 'assets/payloads/dummy-json.json';
  constructor(private http: HttpClient) {}

  getFieldList(): Observable<FieldList> {
    return this.http.get<FieldList>(this.url);
    // .pipe(share());
  }

  // setFieldList(data) {
  //   return this.http.post<Field>(this.tempurl, data);
  // }
}
