import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { delay } from 'rxjs';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies-slider',
  templateUrl: './movies-slider.component.html',
  styleUrls: ['./movies-slider.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]),
      transition('* => void', [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))]),
    ])
  ]
})
export class MoviesSliderComponent {
  current = 0;
  movies_data: any;
  tv_shows: any;


  constructor(private movieService: MoviesService) { }

  ngOnInit() {
    this.getnowPlayingMovies(1);
    this.sliderTimer();
  }

  getnowPlayingMovies(page: number) {
    this.movieService.getNowPlaying(page).pipe(delay(2000)).subscribe((res: any) => {
      this.movies_data = res.results;
    });
  }

  sliderTimer() {
    // setInterval(() => {
    //   this.current = ++this.current % this.movies_data.length;
    // }, 5000);
  }
}
