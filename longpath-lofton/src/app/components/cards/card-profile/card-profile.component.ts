import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from '@angular/router'; 
import { City } from "src/app/models/city.model";
import { DataService } from "src/app/services/data.service";

@Component({
  selector: "app-card-profile",
  templateUrl: "./card-profile.component.html",
})
export class CardProfileComponent implements OnInit {

  public details: City;
  public cityCode: string;

  constructor(
    private routeParams: ActivatedRoute,
    private router: Router,
    private cityDataService: DataService
  ) {}

  ngOnInit(): void {
    this.cityDataService.getData().toPromise().then(data => {
      this.routeParams.params.subscribe((params: Params) => {
        this.cityCode = params['code'];
        const cityDetails = data.find(c => c.id === this.cityCode);
        if (!cityDetails) {
          this.router.navigate(['/']);
        }
        this.details = cityDetails;
      });
    });
    
  }
}
