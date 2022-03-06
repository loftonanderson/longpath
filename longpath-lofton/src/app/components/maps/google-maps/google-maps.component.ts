import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { City } from "src/app/models/city.model";
import { DataService } from "src/app/services/data.service";

declare const google: any;

@Component({
  selector: "app-google-maps",
  templateUrl: "./google-maps.component.html",
})
export class GoogleMapsComponent implements OnInit {
  
  public markerData: City[] = [];

  constructor(
    private router: Router,
    private cityDataService: DataService
  ) {}

  ngOnInit(): void {
    this.cityDataService.getData().toPromise().then(data => {
      this.markerData = data;
      this.setupMap();
    });
  }

  public setupMap() {
    let map = document.getElementById("map-canvas");
    const centerlng = new google.maps.LatLng(39.8097343, -98.5556199);
    const mapOptions = {
      zoom: 5,
      scrollwheel: true,
      center: centerlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [
        {
          featureType: "poi",
          elementType: "all",
          stylers: [{ visibility: "off" }],
        }
      ]
    };

    map = new google.maps.Map(map, mapOptions);
    const windows = [];
    const markers = [];

    this.markerData.forEach(data => {
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(data.lat, data.lng),
        map: map,
        animation: google.maps.Animation.DROP,
        title: data.city + ', ' + data.state,
        open: false,
        id: data.id
      });

      const infowindow = new google.maps.InfoWindow({
        content: `<div>
        <b>${data.city}, ${data.state}</b>
        <p>County: ${data.county}</p>
        <p>Click on the marker again for more details.</p>
        </div>`,
      });

      markers.push(marker);
      windows.push(infowindow);

      google.maps.event.addListener(marker, "click", () => {
        markers.forEach(m => {
          if (marker.id !== m.id) {
            m.open = false
          }
        });
        windows.forEach(w => w.close());

        if (!marker.open) {
          marker.open = true;
          infowindow.open(map, marker);
        } else {
          this.router.navigate(['/details', data.id]);
        }
      });

      google.maps.event.addListener(map, 'click', function() {
        marker.open = false;
        infowindow.close();
      });
    });
  }
}
