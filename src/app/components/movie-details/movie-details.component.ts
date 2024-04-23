import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';
import { AppMovieDialogComponent } from './movie-dialog/movie-dialog.component';
// import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent {
  public id!: number;
  public video!: boolean;
  movie: any;
  baseUrl = 'https://www.youtube.com/embed/';
  autoplay = '?rel=0;&autoplay=1&mute=0';
  relatedvideo: any;
  casts: any = [];
  backdrops: any = [];
  recomendMovies: any = [];
  responsiveOptions;


  constructor(
    private movieService: MoviesService,
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog
  ) {
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

  ngOnInit() {
    this.router.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.getSingleMoviesVideos(this.id);
      this.getSingleMoviesDetails(this.id);
      this.getCast(this.id);
      this.getBackropsImages(this.id);
      this.getRecomendMovie(this.id);
    });
  }

  getSingleMoviesDetails(id:any){
    this.movieService.getMovieDetails(id).subscribe((res: any) => {
      this.movie = res;
    });
  }

  getSingleMoviesVideos(id: any) {
    this.movieService.getMovieVideos(id).subscribe((res: any) => {
      if (res.results.length) {
        this.video = res.results[0];
        this.relatedvideo = res.results;
      }
    });
  }

  openDialogMovie(video: any): void {
    this.video['url'] = this.sanitizer.bypassSecurityTrustResourceUrl(this.baseUrl + video.key + this.autoplay); 
    this.dialog.open(AppMovieDialogComponent, {
      height: '600px',
      width: '900px',
      data: { video: this.video}
    });
  }
  
  getCast(id: any) {
    this.movieService.getMovieCast(id).subscribe((res: any) => {
      this.casts = res.cast;
    });
  }

  getBackropsImages(id: any) {
    this.movieService.getBackdropsImages(id).subscribe((res: any) => {
      this.backdrops = res.backdrops;
    });
  }

  getRecomendMovie(id: any) {
    this.movieService.getRecomendMovies(id).subscribe((res: any) => {
      this.recomendMovies = res.results;
    });
  }
}
