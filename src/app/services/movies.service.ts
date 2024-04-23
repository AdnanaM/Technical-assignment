import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movies } from '../interfaces/movies';
import { Cast } from '../interfaces/credits';



@Injectable({
  providedIn: 'root'
})

export class MoviesService {
  private baseURL = "https://api.themoviedb.org/3";
  private apikey = "dc5551505793e28ebe98db65cb7f64df";
  language = 'en-US';
  region = 'US';
  Movies!: Movies;


  constructor (private http: HttpClient) { }


  sliderMovies (): Observable<Movies> {
    return this.http.get<Movies>(`${this.baseURL}/movie/now_playing?api_key=${this.apikey}`);
  }

  getNowPlaying(page: number): Observable<any> {
    return this.http.get(`${this.baseURL}/movie/now_playing?api_key=${this.apikey}&page=${page}&language=${this.language}&region=${this.region}`);
  }

  getTopRatedMovies(page: number): Observable<any> {
    return this.http.get(`${this.baseURL}/movie/top_rated?api_key=${this.apikey}&page=${page}&language=${this.language}&region=${this.region}`);
  }

  searchMovies(searchStr: string): Observable<Movies> {
    return this.http.get<Movies>(`${this.baseURL}/search/movie?api_key=${this.apikey}&query=${searchStr}`);
  }

  getMovieDetails(id: string): Observable<Movies> {
    return this.http.get<Movies>(`${this.baseURL}/movie/${id}?api_key=${this.apikey}`);
  }

  getMovieVideos(id: string): Observable<Movies> {
    return this.http.get<Movies>(`${this.baseURL}/movie/${id}/videos?api_key=${this.apikey}`);
  }

  getMovieCast(id: string): Observable<Cast> {
    return this.http.get<Cast>(`${this.baseURL}/movie/${id}/credits?api_key=${this.apikey}`);
  }

  getBackdropsImages(id: string) {
    return this.http.get(`${this.baseURL}/movie/${id}/images?api_key=${this.apikey}`);
  }

  getRecomendMovies(id: string): Observable<any> {
    return this.http.get(`${this.baseURL}/movie/${id}/recommendations?api_key=${this.apikey}`);
  }

  getGenres(): Observable<any> {
    return this.http.get(`${this.baseURL}/genre/movie/list?api_key=${this.apikey}&language=${this.language}`);
  }

  getMoviesByGenre(id: string): Observable<any> {
    return this.http.get(`${this.baseURL}/genre/${id}/movies?api_key=${this.apikey}`);
  }
}