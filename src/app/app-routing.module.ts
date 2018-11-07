import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MoviesComponent } from "./components/movies/movies.component";
import { TvshowsComponent } from "./components/tvshows/tvshows.component";
import { DetailsComponent } from "./components/details/details.component";

const routes: Routes = [
  {
    path: "movies",
    component: MoviesComponent
  },
  {
    path: "tvshows",
    component: TvshowsComponent
  },
  {
    path: "details/:id/:type",
    component: DetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
