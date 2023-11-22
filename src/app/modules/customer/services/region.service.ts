import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Region } from '../_models/region';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  constructor(private http:HttpClient) { }

  private url = "http://localhost:8080/region";

  public createRegion(region: Object) {
    return this.http.post(this.url, region);
  }

  public enableRegion(id: number) {
    return this.http.put(`${this.url}/${id}/activate`, null);
  }

  public disableRegion(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  public updateRegion(region: any, id: number) {
    return this.http.put(`${this.url}/${id}`, region);
  }

  public getRegion(id: number): Observable<Region> {
    return this.http.get<Region>(`${this.url}/${id}`);
  }

  public getRegions(): Observable<Region[]> {
    return this.http.get<Region[]>(this.url);
  }

}
