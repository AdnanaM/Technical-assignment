import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { delay } from 'rxjs/internal/operators/delay';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent {

  genreslist: any;
  loader = true;

  constructor(
    private _movie: MoviesService
  ) { }

  ngOnInit() {
    this.MovieGenre();
  }

  MovieGenre() {
    this._movie.getGenres().pipe(delay(2000)).subscribe((res: any) => {
      console.log(res)
      this.genreslist = res.genres;
      this.loader = false;
    });
  }
}
