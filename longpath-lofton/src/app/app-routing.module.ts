import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// layouts
import { DashboardComponent } from "./layouts/dashboard/dashboard.component";

// landing views
import { MapComponent } from "./views/landing/map/map.component";
import { DetailsComponent } from "./views/landing/details/details.component";

const routes: Routes = [
  // landing views
  {
    path: "",
    component: DashboardComponent,
    children: [
      { path: "", component: MapComponent },
      { path: "details/:code", component: DetailsComponent }
    ],
  },
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
