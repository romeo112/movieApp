import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class MoviesService {
  constructor(private http: Http) {}

  searchMovies(searchValue) {
    const urlString =
      "https://api.themoviedb.org/3/search/movie?api_key=15be1e2d9596231d5d2d8af345ecc012&query=" +
      searchValue;
    return this.http.get(urlString).pipe(map(res => res.json()));
  }

  showMovie(id) {
    const urlString =
      "https://api.themoviedb.org/3/movie/" +
      id +
      "?api_key=15be1e2d9596231d5d2d8af345ecc012";
    return this.http.get(urlString).pipe(map(res => res.json()));
  }

  showMovieVideos(id) {
    const urlString =
      "https://api.themoviedb.org/3/movie/" +
      id +
      "/videos?api_key=15be1e2d9596231d5d2d8af345ecc012";
    return this.http.get(urlString).pipe(map(res => res.json()));
  }

  top10() {
    const urlString =
      "https://api.themoviedb.org/3/movie/top_rated?api_key=15be1e2d9596231d5d2d8af345ecc012";
    return this.http.get(urlString).pipe(map(res => res.json()));
  }
}
