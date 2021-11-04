import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class Service {
  constructor(private http: HttpClient) {}

  public async apiRest(requestJson: string, method: string): Promise<Observable<any>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Acceontrol-Allow-Headers': 'Content-Type, Accept',
      'Access-Css-Control-Allow-Methods': 'POST,GET,OPTIONS',
    });
    return this.http.post<any>(environment.URL_BASE + method, requestJson, {
      headers,
    });
  }
}
