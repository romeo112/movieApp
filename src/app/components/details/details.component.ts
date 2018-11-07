import { Component, OnInit } from "@angular/core";
import { MoviesService } from "../../services/movies.service";
import { Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { TvshowsService } from "../../services/tvshows.service";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.css"]
})
export class DetailsComponent implements OnInit {
  movie = {
    title: null,
    overview: null,
    poster_src: null
  };
  tvshow = {
    name: null,
    overview: null,
    poster_src: null
  };
  videos;
  length;

  constructor(
    private moviesService: MoviesService,
    private tvshowsService: TvshowsService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    //grab id from url
    let id = this.router.url.split("/")[2];
    let type = this.router.url.split("/")[3];
    //movie subscribe methods:
    if (type === "movie") {
      //subsrbibe to showMovie
      this.moviesService.showMovie(id).subscribe(data => {
        if (data) {
          if (data.poster_path !== null) {
            this.movie.poster_src =
              "https://image.tmdb.org/t/p/w500" + data.poster_path;
          } else {
            this.movie.poster_src = "assets/nope1.jpg";
          }
          this.movie.overview = data.overview;
          this.movie.title = data.title;
        }
      });
      //subscribe to showMovieVideos
      this.moviesService.showMovieVideos(id).subscribe(data => {
        if (data) {
          this.videos = [];
          this.length = 0;

          data.results.forEach(video => {
            let videoPom = "";
            videoPom = "https://www.youtube.com/embed/" + video.key;
            if (this.length < 1) {
              this.videos.push(videoPom);
            }
            this.length++;
          });
        }
      });
    }
    //tvshow subscribe methods
    if (type === "tvshow") {
      //subscribe to showTVshows
      this.tvshowsService.showTvshow(id).subscribe(data => {
        if (data) {
          if (data.poster_path !== null) {
            this.tvshow.poster_src =
              "https://image.tmdb.org/t/p/w500" + data.poster_path;
          } else {
            this.tvshow.poster_src = "assets/nope1.jpg";
          }
          this.tvshow.overview = data.overview;
          this.tvshow.name = data.name;
        }
      });
      //subscribe to showTvshowsVideos
      this.tvshowsService.showTvshowsVideos(id).subscribe(data => {
        if (data) {
          this.videos = [];
          this.length = 0;
          data.results.forEach(video => {
            let videoPom = "";
            videoPom = "https://www.youtube.com/embed/" + video.key;
            if (this.length < 1) {
              this.videos.push(videoPom);
            }
            this.length++;
          });
        }
      });
    }
  }

  getEmbedUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
