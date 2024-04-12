import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Investor } from '../models/investor';

@Injectable({
  providedIn: 'root'
})
export class InvestorsService {
  baseUrl='https://9i0lw5wwx2.execute-api.us-west-2.amazonaws.com/';

  // https://9i0lw5wwx2.execute-api.us-west-2.amazonaws.com/Production/add_contact_to_investor_access'
  constructor(private http: HttpClient) { }

  requestAccess(investor:Investor): Observable<any> {
    return this.http.post(this.baseUrl + 'Production/add_contact_to_investor_access', investor);
  }
}
