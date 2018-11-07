import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class TvshowsService {
  constructor(private http: Http) {}

  searchTvshows(searchValue) {
    const urlString =
      "https://api.themoviedb.org/3/search/tv?api_key=15be1e2d9596231d5d2d8af345ecc012&query=" +
      searchValue;
    return this.http.get(urlString).pipe(map(res => res.json()));
  }

  showTvshow(id) {
    const urlString =
      "https://api.themoviedb.org/3/tv/" +
      id +
      "?api_key=15be1e2d9596231d5d2d8af345ecc012";
    return this.http.get(urlString).pipe(map(res => res.json()));
  }

  showTvshowsVideos(id) {
    const urlString =
      "https://api.themoviedb.org/3/tv/" +
      id +
      "/videos?api_key=15be1e2d9596231d5d2d8af345ecc012";
    return this.http.get(urlString).pipe(map(res => res.json()));
  }

  top10() {
    const urlString =
      "https://api.themoviedb.org/3/tv/top_rated?api_key=15be1e2d9596231d5d2d8af345ecc012";
    return this.http.get(urlString).pipe(map(res => res.json()));
  }
}
