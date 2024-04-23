import { Component } from '@angular/core';
import { delay } from 'rxjs';
import { Movie } from 'src/app/interfaces/movies';
import { MoviesService } from 'src/app/services/movies.service';
import { TvService } from 'src/app/services/tv.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  nowPlaying: any;
  loader = true;
  tvShows: any;
  responsiveOptions;

  constructor (private moviesService: MoviesService, private tvSevice: TvService) {   
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  ngOnInit (): void {
    this.trendingMovies(1);
    this.tvShow(1);
  }

  trendingMovies(page: number) {
    this.moviesService.getNowPlaying(page).pipe(delay(2000)).subscribe((res: any) => {
      console.log(res)
      this.nowPlaying = res.results;
      this.loader = false;
    });
  }

  tvShow(page: number) {
    this.tvSevice.getTvOnTheAir(page).pipe(delay(2000)).subscribe((res: any) => {
      this.tvShows = res.results;
      this.loader = false;
    });
  }
}
