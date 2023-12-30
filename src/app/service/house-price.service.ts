import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HouseData } from '../model/houseData';

@Injectable({
  providedIn: 'root'
})
export class HousePriceService {
  private host= environment.apiUrl
  constructor(private http: HttpClient) { }

  public getAll():Observable<HouseData>{
    return this.http.get<HouseData>(`${this.host}/`);
  }

  public askForPrice(value: any): Observable<string>{
    return this.http.post<string>(`${this.host}/`,value);
  }

}
