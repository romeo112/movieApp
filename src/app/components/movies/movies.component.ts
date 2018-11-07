import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MoviesService } from "../../services/movies.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-movies",
  templateUrl: "./movies.component.html",
  styleUrls: ["./movies.component.css"]
})
export class MoviesComponent implements OnInit {
  form: FormGroup;
  movies;
  searchActive = false;

  constructor(
    private formBuilder: FormBuilder,
    private moviesService: MoviesService,
    private router: Router
  ) {
    this.createForm(); // Create Angular 2 Form when component loads
  }

  // Function to create registration form
  createForm() {
    this.form = this.formBuilder.group({
      searchbar: [
        "",
        Validators.compose([
          Validators.minLength(3), // Minimum length is 3 characters
          this.validateSearchbar // Custom validation
        ])
      ]
    });
  }

  validateSearchbar(controls) {
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { validateSearchbar: true };
    }
  }

  search() {
    let searchValue = this.form.get("searchbar").value;
    if (searchValue.length > 2) {
      this.searchActive = true;
      this.moviesService.searchMovies(searchValue).subscribe(data => {
        this.movies = [];
        data.results.forEach(movie => {
          let moviesPom = {
            poster_src: null,
            title: null,
            id: null,
            overview: null
          };
          if (movie.poster_path !== null) {
            moviesPom.poster_src =
              "https://image.tmdb.org/t/p/w185" + movie.poster_path;
          } else {
            moviesPom.poster_src = "assets/nope.jpg";
          }
          moviesPom.overview = movie.overview;
          moviesPom.title = movie.title;
          moviesPom.id = movie.id;
          this.movies.push(moviesPom);
        });
      });
    } else {
      this.searchActive = false;
      this.top10display();
    }
  }

  showMovie(id) {
    this.router.navigate(["/details/" + id + "/movie"]);
  }

  top10display() {
    this.movies = [];
    this.moviesService.top10().subscribe(data => {
      let limit = 0;
      for (let i = 0; i < 10; i++) {
        let movie = data.results[i];
        let moviePom = {
          poster_src: null,
          title: null,
          id: null,
          overview: null
        };
        if (movie.poster_path !== null) {
          moviePom.poster_src =
            "https://image.tmdb.org/t/p/w342" + movie.poster_path;
        } else {
          moviePom.poster_src = "assets/nope.jpg";
        }
        moviePom.overview = movie.overview;
        moviePom.title = movie.title;
        moviePom.id = movie.id;
        this.movies.push(moviePom);
      }
    });
  }

  ngOnInit() {
    this.top10display();
  }
}
