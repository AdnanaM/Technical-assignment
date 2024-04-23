import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TvService {
  private baseURL = "https://api.themoviedb.org/3";
  private apikey = "dc5551505793e28ebe98db65cb7f64df";
  language = 'en-US';
  region = 'US';

  constructor(private http: HttpClient) { }

  getTvOnTheAir(page: number): Observable<any> {
    return this.http.get(`${this.baseURL}/tv/on_the_air?api_key=${this.apikey}&page=${page}&language=${this.language}`);
  }

  getTopRatedTVShows(page: number): Observable<any> {
    return this.http.get(`${this.baseURL}/tv/top_rated?api_key=${this.apikey}&page=${page}&language=${this.language}`);
  }

  searchtv(searchStr: string): Observable<any> {
    return this.http.get(`${this.baseURL}/search/tv?api_key=${this.apikey}&query=${searchStr}`);
  }
}
