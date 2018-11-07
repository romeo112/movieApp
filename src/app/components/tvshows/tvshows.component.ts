import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TvshowsService } from "../../services/tvshows.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-tvshows",
  templateUrl: "./tvshows.component.html",
  styleUrls: ["./tvshows.component.css"]
})
export class TvshowsComponent implements OnInit {
  form: FormGroup;
  tvshows;
  searchActive = false;

  constructor(
    private formBuilder: FormBuilder,
    private tvshowsService: TvshowsService,
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
      this.tvshowsService.searchTvshows(searchValue).subscribe(data => {
        this.tvshows = [];
        data.results.forEach(tvshow => {
          let tvshowPom = {
            poster_src: null,
            name: null,
            id: null,
            overview: null
          };
          if (tvshow.poster_path !== null) {
            tvshowPom.poster_src =
              "https://image.tmdb.org/t/p/w185" + tvshow.poster_path;
          } else {
            tvshowPom.poster_src = "assets/nope.jpg";
          }
          tvshowPom.overview = tvshow.overview;
          tvshowPom.name = tvshow.name;
          tvshowPom.id = tvshow.id;
          this.tvshows.push(tvshowPom);
        });
      });
    } else {
      this.searchActive = false;
      this.top10display();
    }
  }

  showTvshow(id) {
    this.router.navigate(["/details/" + id + "/tvshow"]);
  }

  top10display() {
    this.tvshows = [];
    this.tvshowsService.top10().subscribe(data => {
      let limit = 0;
      for (let i = 0; i < 10; i++) {
        let tvshow = data.results[i];
        let tvshowPom = {
          poster_src: null,
          name: null,
          id: null,
          overview: null
        };
        if (tvshow.poster_path !== null) {
          tvshowPom.poster_src =
            "https://image.tmdb.org/t/p/w342" + tvshow.poster_path;
        } else {
          tvshowPom.poster_src = "assets/nope.jpg";
        }
        tvshowPom.overview = tvshow.overview;
        tvshowPom.name = tvshow.name;
        tvshowPom.id = tvshow.id;
        this.tvshows.push(tvshowPom);
      }
    });
  }

  ngOnInit() {
    this.top10display();
  }
}
