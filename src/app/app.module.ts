import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MoviesComponent } from "./components/movies/movies.component";
import { TvshowsComponent } from "./components/tvshows/tvshows.component";
import { MoviesService } from "./services/movies.service";
import { TvshowsService } from "./services/tvshows.service";
import { ReactiveFormsModule } from "@angular/forms";
import { DetailsComponent } from "./components/details/details.component";

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    TvshowsComponent,
    DetailsComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpModule, ReactiveFormsModule],
  providers: [MoviesService, TvshowsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
