import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { PipeModule } from './pipe/pipe.module';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'primeng/carousel';
import { SidebarModule } from 'primeng/sidebar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


//Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MoviesSliderComponent } from './components/movies-slider/movies-slider.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { AppMovieDialogComponent } from './components/movie-details/movie-dialog/movie-dialog.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';



//Services
import { MoviesService } from './services/movies.service';
import { TvService } from './services/tv.service';
import { SkeletonComponent } from './components/skeleton/skeleton.component';
import { MoviesComponent } from './components/movies/movies.component';
import { TvShowsComponent } from './components/tv-shows/tv-shows.component';
import { GenresComponent } from './components/genres/genres.component';
import { GenreComponent } from './components/genre/genre.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MoviesSliderComponent,
    MovieDetailsComponent,
    AppMovieDialogComponent,
    FooterComponent,
    HeaderComponent,
    SkeletonComponent,
    MoviesComponent,
    TvShowsComponent,
    GenresComponent,
    GenreComponent,
    SignupComponent,
    LoginComponent
  ],
  imports: [
    MatTabsModule,
    CarouselModule,
    SidebarModule,
    MatDialogModule,
    MatIconModule,
    NgxSkeletonLoaderModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    PipeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [MoviesService, TvService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
