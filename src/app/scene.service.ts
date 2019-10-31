import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})


export class SceneService {
  private baseUrl = 'https://proef.diligentia-uitgeverij.be/api/';
  constructor(
    private http: HttpClient,
  ) { }

  // Get current page of scenes regarding page limit and skip
  getScenes(limit: number, skip: number) {
    return this.http.get<any>(`${this.baseUrl}/scenes/${limit}/${skip}`, httpOptions);
  }

  // Get current scene by the given ID
  getScene(id: string) {
    return this.http.get<any>(`${this.baseUrl}/scene/${id}`, httpOptions);
  }
}
